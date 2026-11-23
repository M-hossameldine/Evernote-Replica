import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { saveLogout } from '~modules/auth/data/local/authSlice';

import { API_BASE_URL, REFRESH_LOCK_NAME, REFRESH_PATH } from './apiConfig';
import { ClientErrorCode } from './appApis.interfaces';
import type { ApiError, ApiErrorEnvelope } from './appApis.interfaces';
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenStore';

type ApiBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

/** Body of `POST /auth/refresh` (and login / register / google). */
export type RefreshedSession = {
  accessToken: string;
  /** Seconds until the access token expires. */
  expiresIn: number;
  /** Backend `User` DTO; mapped to the domain model by the auth module. */
  user: unknown;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  // Needed for the refresh cookie on /auth/* requests.
  credentials: 'include',
  prepareHeaders: headers => {
    const token = getAccessToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const isErrorEnvelope = (value: unknown): value is ApiErrorEnvelope =>
  typeof value === 'object' &&
  value !== null &&
  'error' in value &&
  typeof (value as ApiErrorEnvelope).error?.code === 'string';

/** `{ data: X }` → `X`. `204 No Content` (null body) stays `null`. */
export const unwrapEnvelope = (body: unknown): unknown =>
  typeof body === 'object' && body !== null && 'data' in body
    ? (body as { data: unknown }).data
    : body;

/**
 * Normalizes any fetchBaseQuery error into `{ status, data: ApiError }`, the
 * shape `createOnQueryStarted` reads to call `onError`.
 */
export const normalizeError = (
  error: FetchBaseQueryError
): FetchBaseQueryError => {
  if (typeof error.status === 'number') {
    if (isErrorEnvelope(error.data)) {
      const { code, message, details, requestId } = error.data.error;
      const data: ApiError = { code, message, details, requestId };
      return { status: error.status, data };
    }

    const data: ApiError = {
      code: ClientErrorCode.HTTP_ERROR,
      message: `Request failed with status ${error.status}`,
    };

    return { status: error.status, data };
  }

  const clientErrors: Record<string, ApiError['code']> = {
    FETCH_ERROR: ClientErrorCode.NETWORK_ERROR,
    TIMEOUT_ERROR: ClientErrorCode.TIMEOUT_ERROR,
    PARSING_ERROR: ClientErrorCode.PARSING_ERROR,
  };
  const message = 'error' in error ? error.error : 'Request failed';
  const data: ApiError = {
    code: clientErrors[error.status] ?? ClientErrorCode.UNKNOWN_ERROR,
    message,
  };
  return { status: 'CUSTOM_ERROR', error: message, data };
};

/** Base query that unwraps `{ data }` and normalizes `{ error }`. */
export const envelopeBaseQuery: ApiBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    return { error: normalizeError(result.error), meta: result.meta };
  }
  return { data: unwrapEnvelope(result.data), meta: result.meta };
};

// ---------------------------------------------------------------------------
// Refresh: only one may be in flight. The backend rotates the refresh token on
// every call and revokes the whole session if an old one is replayed, so two
// concurrent refreshes would log the user out.
//  - inside a tab: every caller shares `refreshPromise`
//  - across tabs: the Web Locks API serializes refreshes (the cookie is read
//    at request time, so a tab waiting on the lock sends the rotated cookie)
// ---------------------------------------------------------------------------

let refreshPromise: Promise<RefreshedSession | null> | null = null;

const runExclusive = <T>(task: () => Promise<T>): Promise<T> => {
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
  return locks ? locks.request(REFRESH_LOCK_NAME, task) : task();
};

/**
 * Exchanges the refresh cookie for a new access token. Resolves to the new
 * session, or `null` when there is no valid session (token is cleared).
 */
export const refreshSession = (
  api: BaseQueryApi,
  extraOptions: object = {}
): Promise<RefreshedSession | null> => {
  if (!refreshPromise) {
    refreshPromise = runExclusive(async () => {
      const result = await envelopeBaseQuery(
        { url: REFRESH_PATH, method: 'POST' },
        api,
        extraOptions
      );

      const session = result.data as RefreshedSession | undefined;

      if (result.error || !session?.accessToken) {
        clearAccessToken();
        return null;
      }

      setAccessToken(session.accessToken);

      return session;
    }).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const isTokenExpired = (error: FetchBaseQueryError) =>
  error.status === 401 && (error.data as ApiError)?.code === 'TOKEN_EXPIRED';

const isRefreshRequest = (args: string | FetchArgs) =>
  (typeof args === 'string' ? args : args.url) === REFRESH_PATH;

/**
 * App base query: on `401 TOKEN_EXPIRED`, refreshes the access token once and
 * retries the request. If the refresh fails, the user is logged out locally.
 */
export const baseQueryWithReauth: ApiBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  // Don't send a token we already know is being replaced.
  if (refreshPromise && !isRefreshRequest(args)) {
    await refreshPromise;
  }

  const tokenUsed = getAccessToken();
  const result = await envelopeBaseQuery(args, api, extraOptions);

  if (
    !result.error ||
    !isTokenExpired(result.error) ||
    isRefreshRequest(args)
  ) {
    return result;
  }

  // Another request already refreshed while this one was in flight.
  const currentToken = getAccessToken();
  if (currentToken && currentToken !== tokenUsed) {
    return envelopeBaseQuery(args, api, extraOptions);
  }

  const session = await refreshSession(api, extraOptions);
  if (!session) {
    api.dispatch(saveLogout());
    return result;
  }

  return envelopeBaseQuery(args, api, extraOptions);
};
