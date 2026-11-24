// @vitest-environment node
// RTK passes the store's AbortSignal to fetch; Node rejects jsdom's signal.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { saveLogin, saveLogout } from '~modules/auth/data/local/authSlice';
import { notesApi } from '~modules/notes/data/remote';

import {
  REFRESH_PATH,
  SESSION_EXPIRED_MESSAGE,
  getAccessToken,
  setAccessToken,
} from './Apis';
import { store } from './store';
import { hideNotification } from './ui-slice/ui-slice';

const json = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const useHandler = (handler: (request: Request) => Response) =>
  vi.stubGlobal(
    'fetch',
    vi.fn((request: Request) => Promise.resolve(handler(request)))
  );

const user = {
  id: 'u1',
  email: 'ada@example.com',
  name: 'Ada',
  avatarUrl: null,
  createdAt: '2026-11-16T10:00:00.000Z',
  updatedAt: '2026-11-16T10:00:00.000Z',
};

const notification = () => store.getState().ui.notification;

const trashNote = (onError?: () => void) =>
  store.dispatch(
    notesApi.endpoints.moveNoteToTrash.initiate({
      extraParams: { noteId: 'n1' },
      ...(onError && { onError }),
    })
  );

beforeEach(() => {
  store.dispatch(saveLogout());
  store.dispatch(hideNotification());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('store listeners', () => {
  it('logout clears the access token and the cached API data', async () => {
    store.dispatch(saveLogin({ user }));
    setAccessToken('token-1');
    useHandler(() => json(200, { data: [] }));
    await store.dispatch(notesApi.endpoints.getActiveNotes.initiate());
    expect(Object.keys(store.getState().api.queries)).not.toHaveLength(0);

    store.dispatch(saveLogout());

    expect(getAccessToken()).toBeNull();
    expect(store.getState().api.queries).toEqual({});
  });

  it('shows a toast for an API error nobody handles', async () => {
    useHandler(() =>
      json(404, {
        error: { code: 'NOTE_NOT_FOUND', message: 'Note not found' },
      })
    );

    await trashNote();

    expect(notification()).toEqual({
      status: 'error',
      message: 'This note no longer exists',
    });
  });

  it('leaves errors to callers that pass onError', async () => {
    useHandler(() =>
      json(404, {
        error: { code: 'NOTE_NOT_FOUND', message: 'Note not found' },
      })
    );
    const onError = vi.fn();

    await trashNote(onError);

    expect(onError).toHaveBeenCalled();
    expect(notification()).toBeNull();
  });

  it('logs out with a session-expired message when the refresh fails', async () => {
    store.dispatch(saveLogin({ user }));
    setAccessToken('revoked');
    useHandler(request =>
      request.url.endsWith(REFRESH_PATH)
        ? json(401, {
            error: {
              code: 'AUTH_REFRESH_TOKEN_INVALID',
              message: 'Session is invalid or has expired',
            },
          })
        : json(401, {
            error: { code: 'TOKEN_INVALID', message: 'Invalid token' },
          })
    );

    await trashNote();

    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(getAccessToken()).toBeNull();
    // Only the session message, not a second generic toast.
    expect(notification()).toEqual({
      status: 'error',
      message: SESSION_EXPIRED_MESSAGE,
    });
  });
});
