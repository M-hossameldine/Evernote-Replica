// @vitest-environment node
// RTK passes the store's AbortSignal to fetch; Node rejects jsdom's signal.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  API_BASE_URL,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
  store,
} from '~store';
import { saveLogout } from '~modules/auth/data/local/authSlice';

import { authApi } from './authApis';
import type { AuthResponseDto } from './authApis.interfaces';

const userDto = {
  id: '665f1c2e8b3e4a0012345678',
  email: 'ada@example.com',
  name: 'Ada Lovelace',
  avatarUrl: null,
  createdAt: '2026-11-16T10:00:00.000Z',
  updatedAt: '2026-11-16T10:00:00.000Z',
};

const authResponse = (accessToken: string): { data: AuthResponseDto } => ({
  data: { user: userDto, accessToken, expiresIn: 900 },
});

const json = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

let fetchMock: ReturnType<typeof vi.fn>;
const useHandler = (handler: (request: Request) => Response) => {
  fetchMock = vi.fn((request: Request) => Promise.resolve(handler(request)));
  vi.stubGlobal('fetch', fetchMock);
};
const lastRequest = () => fetchMock.mock.calls.at(-1)?.[0] as Request;

beforeEach(() => {
  clearAccessToken();
  store.dispatch(saveLogout());
  store.dispatch(authApi.util.resetApiState());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('authApi', () => {
  it('login stores the token in memory and only the user in Redux', async () => {
    useHandler(() => json(200, authResponse('token-1')));
    const onSuccess = vi.fn();

    await store.dispatch(
      authApi.endpoints.login.initiate({
        payload: { email: 'ada@example.com', password: 'secret' },
        onSuccess,
      })
    );

    const request = lastRequest();
    expect(request.url).toBe(`${API_BASE_URL}/auth/login`);
    expect(request.method).toBe('POST');
    expect(await request.json()).toEqual({
      email: 'ada@example.com',
      password: 'secret',
    });

    expect(getAccessToken()).toBe('token-1');
    expect(store.getState().auth).toEqual({ user: userDto, isLoggedIn: true });
    expect(onSuccess).toHaveBeenCalledWith({ user: userDto });
    expect(JSON.stringify(store.getState().api)).not.toContain('token-1');
  });

  it('register sends the name and starts the session', async () => {
    useHandler(() => json(201, authResponse('token-2')));

    await store.dispatch(
      authApi.endpoints.register.initiate({
        payload: {
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          password: 'Secret1!x',
        },
      })
    );

    expect(lastRequest().url).toBe(`${API_BASE_URL}/auth/register`);
    expect(await lastRequest().json()).toMatchObject({ name: 'Ada Lovelace' });
    expect(getAccessToken()).toBe('token-2');
    expect(store.getState().auth.isLoggedIn).toBe(true);
  });

  it('login failure reports the backend error code', async () => {
    useHandler(() =>
      json(401, {
        error: {
          code: 'AUTH_INVALID_CREDENTIALS',
          message: 'Incorrect email or password',
        },
      })
    );
    const onError = vi.fn();

    await store.dispatch(
      authApi.endpoints.login.initiate({
        payload: { email: 'ada@example.com', password: 'wrong' },
        onError,
      })
    );

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_INVALID_CREDENTIALS' })
    );
    expect(getAccessToken()).toBeNull();
    expect(store.getState().auth.isLoggedIn).toBe(false);
  });

  it('restoreSession logs in from the refresh cookie', async () => {
    useHandler(() => json(200, authResponse('token-3')));

    const result = await store.dispatch(
      authApi.endpoints.restoreSession.initiate()
    );

    expect(lastRequest().url).toBe(`${API_BASE_URL}/auth/refresh`);
    expect(lastRequest().credentials).toBe('include');
    expect(result).toEqual({ data: { user: userDto } });
    expect(getAccessToken()).toBe('token-3');
    expect(store.getState().auth.user).toEqual(userDto);
  });

  it('restoreSession resolves to null without a session', async () => {
    useHandler(() =>
      json(401, {
        error: {
          code: 'AUTH_REFRESH_TOKEN_INVALID',
          message: 'Session is invalid or has expired',
        },
      })
    );

    const result = await store.dispatch(
      authApi.endpoints.restoreSession.initiate()
    );

    expect(result).toEqual({ data: null });
    expect(store.getState().auth.isLoggedIn).toBe(false);
  });

  it('logout clears the session even if the request fails', async () => {
    setAccessToken('token-4');
    useHandler(() => {
      throw new TypeError('Failed to fetch');
    });
    const onError = vi.fn();

    await store.dispatch(authApi.endpoints.logout.initiate({ onError }));

    expect(lastRequest().url).toBe(`${API_BASE_URL}/auth/logout`);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'NETWORK_ERROR' })
    );
    expect(getAccessToken()).toBeNull();
    expect(store.getState().auth).toEqual({ user: null, isLoggedIn: false });
  });
});
