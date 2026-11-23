import type { User } from '~modules/auth/domain/models';

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/** One field-level problem from a backend `VALIDATION_ERROR`. */
export type ApiErrorDetail = {
  location: string;
  path: string;
  message: string;
};

/**
 * Normalized error handed to `onError` callbacks.
 * `code` is a backend `ErrorCode` (e.g. `AUTH_INVALID_CREDENTIALS`) or a
 * `ClientErrorCode` when the request never got a valid backend response.
 */
export type ApiError = {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
  requestId?: string;
};

/** Error codes produced on the client, never by the backend. */
export const ClientErrorCode = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  PARSING_ERROR: 'PARSING_ERROR',
  HTTP_ERROR: 'HTTP_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/** Successful backend responses are wrapped as `{ data: ... }`. */
export type ApiSuccessEnvelope<T> = { data: T };

/** Backend error responses are wrapped as `{ error: {...} }`. */
export type ApiErrorEnvelope = { error: ApiError };

export type RequestCallbacks<RESULT = any> = {
  onSuccess?: (result: RESULT) => void;
  onError?: (error: ApiError) => void;
  onSettled?: () => void;
};

export type MutationRequestParams<
  RESULT = any, // * Request mapped result compatible with the data local & presentation layer
  PAYLOAD = void,
  QUERY_PARAMS = void, // URL query parameters
  EXTRA_PARAMS = void, // Additional parameters
> = PAYLOAD extends void
  ? EXTRA_PARAMS extends void
    ? QUERY_PARAMS extends void
      ? RequestCallbacks<RESULT> // If all params are void
      : RequestCallbacks<RESULT> & { queryParams: QUERY_PARAMS } // If only QUERY_PARAMS is provided
    : QUERY_PARAMS extends void
      ? RequestCallbacks<RESULT> & { extraParams: EXTRA_PARAMS } // If only EXTRA_PARAMS is provided
      : RequestCallbacks<RESULT> & {
          extraParams: EXTRA_PARAMS;
          queryParams: QUERY_PARAMS;
        } // If both provided
  : EXTRA_PARAMS extends void
    ? QUERY_PARAMS extends void
      ? RequestCallbacks<RESULT> & { payload: PAYLOAD } // If only PAYLOAD is provided
      : RequestCallbacks<RESULT> & {
          payload: PAYLOAD;
          queryParams: QUERY_PARAMS;
        } // If PAYLOAD and QUERY_PARAMS
    : QUERY_PARAMS extends void
      ? RequestCallbacks<RESULT> & {
          payload: PAYLOAD;
          extraParams: EXTRA_PARAMS;
        } // If PAYLOAD and EXTRA_PARAMS
      : RequestCallbacks<RESULT> & {
          payload: PAYLOAD;
          extraParams: EXTRA_PARAMS;
          queryParams: QUERY_PARAMS;
        }; // If all three are provided

export type QueryRequestParams<
  RESULT = any,
  QUERY_PARAMS = void,
  EXTRA_PARAMS = void,
> = EXTRA_PARAMS extends void
  ? QUERY_PARAMS extends void
    ? RequestCallbacks<RESULT> // If all params are void
    : RequestCallbacks<RESULT> & { queryParams: QUERY_PARAMS } // If only QUERY_PARAMS is provided
  : QUERY_PARAMS extends void
    ? RequestCallbacks<RESULT> & { extraParams: EXTRA_PARAMS } // If only EXTRA_PARAMS is provided
    : RequestCallbacks<RESULT> & {
        extraParams: EXTRA_PARAMS;
        queryParams: QUERY_PARAMS;
      }; // If both provided

export type EndpointParamsWithAuth<T> = T & {
  defaultParams: {
    user: User;
  };
};

export type EndpointParamsWithoutAuth<T> = T;
