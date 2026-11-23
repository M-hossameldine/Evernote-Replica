import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { saveLogout } from '~modules/auth/data/local/authSlice';

import { API_BASE_URL, REFRESH_PATH } from './apiConfig';
import { baseQueryWithReauth, envelopeBaseQuery } from './baseQuery';
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenStore';

type Handler = (request: Request) => Response | Promise<Response>;

const json = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const tokenExpired = () =>
  json(401, {
    error: { code: 'TOKEN_EXPIRED', message: 'Access token expired' },
  });

const session = (accessToken: string) => ({
  data: { accessToken, expiresIn: 900, user: { id: 'u1' } },
});

const pathOf = (request: Request) =>
  new URL(request.url).pathname.replace(new URL(API_BASE_URL).pathname, '');

const createApi = () =>
  ({
    // jsdom's AbortSignal is rejected by Node's Request, so leave it out.
    signal: undefined,
    abort: vi.fn(),
    dispatch: vi.fn(),
    getState: () => ({}),
    extra: undefined,
    endpoint: 'test',
    type: 'query',
  }) as unknown as BaseQueryApi;

let fetchMock: ReturnType<typeof vi.fn>;
const useHandler = (handler: Handler) => {
  fetchMock = vi.fn((request: Request) => Promise.resolve(handler(request)));
  vi.stubGlobal('fetch', fetchMock);
};
const requestsTo = (path: string) =>
  fetchMock.mock.calls
    .map(([request]) => request as Request)
    .filter(request => pathOf(request) === path);

beforeEach(() => {
  clearAccessToken();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('envelopeBaseQuery', () => {
  it('unwraps { data }, sends the bearer token and includes credentials', async () => {
    setAccessToken('token-1');
    useHandler(() => json(200, { data: [{ id: 'n1' }] }));

    const result = await envelopeBaseQuery('/notes', createApi(), {});

    expect(result).toMatchObject({ data: [{ id: 'n1' }] });
    const [request] = fetchMock.mock.calls[0] as [Request];
    expect(request.url).toBe(`${API_BASE_URL}/notes`);
    expect(request.headers.get('Authorization')).toBe('Bearer token-1');
    expect(request.credentials).toBe('include');
  });

  it('returns null for 204 No Content', async () => {
    useHandler(() => new Response(null, { status: 204 }));

    const result = await envelopeBaseQuery(
      { url: '/notes/1', method: 'DELETE' },
      createApi(),
      {}
    );

    expect(result.error).toBeUndefined();
    expect(result.data).toBeNull();
  });

  it('normalizes the backend error envelope', async () => {
    const details = [
      { location: 'body', path: 'email', message: 'Invalid email address' },
    ];
    useHandler(() =>
      json(400, {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details,
          requestId: 'req-1',
        },
      })
    );

    const result = await envelopeBaseQuery('/auth/login', createApi(), {});

    expect(result.error).toEqual({
      status: 400,
      data: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details,
        requestId: 'req-1',
      },
    });
  });

  it('maps non-envelope HTTP errors to HTTP_ERROR', async () => {
    useHandler(() => json(502, { oops: true }));

    const result = await envelopeBaseQuery('/notes', createApi(), {});

    expect(result.error).toMatchObject({
      status: 502,
      data: { code: 'HTTP_ERROR' },
    });
  });

  it('maps network failures to NETWORK_ERROR', async () => {
    useHandler(() => {
      throw new TypeError('Failed to fetch');
    });

    const result = await envelopeBaseQuery('/notes', createApi(), {});

    expect(result.error).toMatchObject({
      status: 'CUSTOM_ERROR',
      data: { code: 'NETWORK_ERROR' },
    });
  });
});

describe('baseQueryWithReauth', () => {
  it('refreshes on TOKEN_EXPIRED and retries with the new token', async () => {
    setAccessToken('expired');
    useHandler(request => {
      if (pathOf(request) === REFRESH_PATH) return json(200, session('fresh'));
      return request.headers.get('Authorization') === 'Bearer fresh'
        ? json(200, { data: 'ok' })
        : tokenExpired();
    });

    const result = await baseQueryWithReauth('/notes', createApi(), {});

    expect(result).toMatchObject({ data: 'ok' });
    expect(getAccessToken()).toBe('fresh');
    expect(requestsTo(REFRESH_PATH)).toHaveLength(1);
    expect(requestsTo(REFRESH_PATH)[0].method).toBe('POST');
    expect(requestsTo('/notes')).toHaveLength(2);
  });

  it('runs a single refresh for concurrent expired requests', async () => {
    setAccessToken('expired');
    let releaseRefresh!: () => void;
    const refreshGate = new Promise<void>(resolve => {
      releaseRefresh = resolve;
    });

    useHandler(async request => {
      if (pathOf(request) === REFRESH_PATH) {
        await refreshGate;
        return json(200, session('fresh'));
      }
      return request.headers.get('Authorization') === 'Bearer fresh'
        ? json(200, { data: pathOf(request) })
        : tokenExpired();
    });

    const api = createApi();
    const pending = Promise.all([
      baseQueryWithReauth('/notes', api, {}),
      baseQueryWithReauth('/users/me', api, {}),
      baseQueryWithReauth('/notes?status=trash', api, {}),
    ]);
    await vi.waitFor(() => expect(requestsTo(REFRESH_PATH)).toHaveLength(1));
    releaseRefresh();
    const results = await pending;

    expect(results.map(result => result.data)).toEqual([
      '/notes',
      '/users/me',
      '/notes',
    ]);
    expect(requestsTo(REFRESH_PATH)).toHaveLength(1);
  });

  it('logs out and returns the original error when the refresh fails', async () => {
    setAccessToken('expired');
    useHandler(request =>
      pathOf(request) === REFRESH_PATH
        ? json(401, {
            error: {
              code: 'AUTH_REFRESH_TOKEN_INVALID',
              message: 'Invalid refresh token',
            },
          })
        : tokenExpired()
    );
    const api = createApi();

    const result = await baseQueryWithReauth('/notes', api, {});

    expect(result.error).toMatchObject({
      status: 401,
      data: { code: 'TOKEN_EXPIRED' },
    });
    expect(getAccessToken()).toBeNull();
    expect(api.dispatch).toHaveBeenCalledWith(saveLogout());
    expect(requestsTo('/notes')).toHaveLength(1);
  });

  it('does not refresh on other 401 errors', async () => {
    useHandler(() =>
      json(401, {
        error: {
          code: 'AUTH_INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      })
    );

    const result = await baseQueryWithReauth(
      { url: '/auth/login', method: 'POST', body: {} },
      createApi(),
      {}
    );

    expect(result.error).toMatchObject({
      data: { code: 'AUTH_INVALID_CREDENTIALS' },
    });
    expect(requestsTo(REFRESH_PATH)).toHaveLength(0);
  });

  it('serializes refreshes across tabs with the Web Locks API', async () => {
    setAccessToken('expired');
    const request = vi.fn((_name: string, task: () => Promise<unknown>) =>
      task()
    );
    vi.stubGlobal('navigator', { locks: { request } });
    useHandler(req =>
      pathOf(req) === REFRESH_PATH
        ? json(200, session('fresh'))
        : req.headers.get('Authorization') === 'Bearer fresh'
          ? json(200, { data: 'ok' })
          : tokenExpired()
    );

    await baseQueryWithReauth('/notes', createApi(), {});

    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0][0]).toBe('evernote-replica:auth-refresh');
  });
});
