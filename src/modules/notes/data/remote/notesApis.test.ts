// @vitest-environment node
// RTK passes the store's AbortSignal to fetch; Node rejects jsdom's signal.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { API_BASE_URL, store } from '~store';
import type { Note } from '~modules/notes/domain/interfaces';

import { notesApi, patchCachedActiveNote } from './notesApis';

const note = (id: string, overrides: Partial<Note> = {}): Note => ({
  id,
  title: `Title ${id}`,
  text: `Text ${id}`,
  tags: [],
  status: 'active',
  createdAt: '2026-11-16T10:00:00.000Z',
  updatedAt: '2026-11-16T10:00:00.000Z',
  deletedAt: null,
  ...overrides,
});

const json = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

type Route = (request: Request) => Response | Promise<Response>;
let fetchMock: ReturnType<typeof vi.fn>;
const useHandler = (handler: Route) => {
  fetchMock = vi.fn((request: Request) => Promise.resolve(handler(request)));
  vi.stubGlobal('fetch', fetchMock);
};
const requests = () => fetchMock.mock.calls.map(([r]) => r as Request);
const route = (request: Request) =>
  `${request.method} ${request.url.replace(API_BASE_URL, '')}`;

const activeList = () =>
  notesApi.endpoints.getActiveNotes.select()(store.getState()).data;
const trashList = () =>
  notesApi.endpoints.getTrashNotes.select()(store.getState()).data;

/** Loads both lists into the cache and keeps them subscribed. */
const loadLists = async (active: Note[], trash: Note[]) => {
  useHandler(request =>
    request.url.includes('status=trash')
      ? json(200, { data: trash })
      : json(200, { data: active })
  );
  await store.dispatch(notesApi.endpoints.getActiveNotes.initiate());
  await store.dispatch(notesApi.endpoints.getTrashNotes.initiate());
};

const serverError = () =>
  json(500, { error: { code: 'INTERNAL_ERROR', message: 'Boom' } });

beforeEach(() => {
  store.dispatch(notesApi.util.resetApiState());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('notesApi', () => {
  it('fetches each list by status', async () => {
    await loadLists([note('a')], [note('t', { status: 'trash' })]);

    expect(requests().map(route)).toEqual([
      'GET /notes?status=active',
      'GET /notes?status=trash',
    ]);
    expect(activeList()).toEqual([note('a')]);
    expect(trashList()?.map(n => n.id)).toEqual(['t']);
  });

  it('addNote puts the created note first and passes it to onSuccess', async () => {
    await loadLists([note('a')], []);
    const created = note('new', { title: '', text: '' });
    useHandler(() => json(201, { data: created }));
    const onSuccess = vi.fn();

    await store.dispatch(
      notesApi.endpoints.addNote.initiate({
        payload: { title: '', text: '' },
        onSuccess,
      })
    );

    expect(route(requests()[0])).toBe('POST /notes');
    expect(await requests()[0].json()).toEqual({ title: '', text: '' });
    expect(activeList()?.map(n => n.id)).toEqual(['new', 'a']);
    expect(onSuccess).toHaveBeenCalledWith(created);
  });

  it('updateNote sends only the changes and keeps newer cached text', async () => {
    await loadLists([note('a')], []);
    // The editor patched the cache with text typed after the request left.
    patchCachedActiveNote(store.dispatch, 'a', { text: 'typed later' });
    useHandler(() =>
      json(200, {
        data: note('a', {
          text: 'saved',
          updatedAt: '2026-11-17T09:00:00.000Z',
        }),
      })
    );

    await store.dispatch(
      notesApi.endpoints.updateNote.initiate({
        payload: { text: 'saved' },
        extraParams: { noteId: 'a' },
      })
    );

    expect(route(requests()[0])).toBe('PATCH /notes/a');
    expect(await requests()[0].json()).toEqual({ text: 'saved' });
    expect(activeList()?.[0]).toMatchObject({
      text: 'typed later',
      updatedAt: '2026-11-17T09:00:00.000Z',
    });
  });

  it('moveNoteToTrash moves the note between lists before the reply', async () => {
    await loadLists([note('a'), note('b')], []);
    let reply!: (response: Response) => void;
    useHandler(() => new Promise<Response>(resolve => (reply = resolve)));

    const pending = store.dispatch(
      notesApi.endpoints.moveNoteToTrash.initiate({
        extraParams: { noteId: 'a' },
      })
    );

    // Optimistic: never missing from both lists while the editor shows it.
    await vi.waitFor(() => expect(reply).toBeDefined());
    expect(activeList()?.map(n => n.id)).toEqual(['b']);
    expect(trashList()).toEqual([
      expect.objectContaining({ id: 'a', status: 'trash' }),
    ]);

    const trashed = note('a', {
      status: 'trash',
      deletedAt: '2026-11-17T09:00:00.000Z',
    });
    reply(json(200, { data: trashed }));
    await pending;

    expect(route(requests()[0])).toBe('POST /notes/a/trash');
    expect(trashList()).toEqual([trashed]);
  });

  it('moveNoteToTrash undoes the move when the request fails', async () => {
    await loadLists([note('a'), note('b')], []);
    useHandler(serverError);
    const onError = vi.fn();

    await store.dispatch(
      notesApi.endpoints.moveNoteToTrash.initiate({
        extraParams: { noteId: 'a' },
        onError,
      })
    );

    expect(activeList()?.map(n => n.id)).toEqual(['a', 'b']);
    expect(trashList()).toEqual([]);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'INTERNAL_ERROR' })
    );
  });

  it('restoreNote moves the note back to the active list', async () => {
    const trashed = note('t', {
      status: 'trash',
      deletedAt: '2026-11-17T09:00:00.000Z',
    });
    await loadLists([note('a')], [trashed]);
    const restored = note('t', { updatedAt: '2026-11-18T09:00:00.000Z' });
    useHandler(() => json(200, { data: restored }));

    await store.dispatch(
      notesApi.endpoints.restoreNote.initiate({ extraParams: { noteId: 't' } })
    );

    expect(route(requests()[0])).toBe('POST /notes/t/restore');
    expect(trashList()).toEqual([]);
    expect(activeList()).toEqual([restored, note('a')]);
  });

  it('deleteNotePermanently removes the note, and restores it on failure', async () => {
    const trashed = [
      note('t1', { status: 'trash' }),
      note('t2', { status: 'trash' }),
    ];
    await loadLists([], trashed);

    useHandler(serverError);
    await store.dispatch(
      notesApi.endpoints.deleteNotePermanently.initiate({
        extraParams: { noteId: 't1' },
      })
    );
    expect(trashList()?.map(n => n.id)).toEqual(['t1', 't2']);

    useHandler(() => new Response(null, { status: 204 }));
    await store.dispatch(
      notesApi.endpoints.deleteNotePermanently.initiate({
        extraParams: { noteId: 't1' },
      })
    );
    expect(route(requests()[0])).toBe('DELETE /notes/t1');
    expect(trashList()?.map(n => n.id)).toEqual(['t2']);
  });

  it('emptyTrash clears the trash list', async () => {
    await loadLists([note('a')], [note('t', { status: 'trash' })]);
    useHandler(() => json(200, { data: { deletedCount: 1 } }));
    const onSuccess = vi.fn();

    await store.dispatch(notesApi.endpoints.emptyTrash.initiate({ onSuccess }));

    expect(route(requests()[0])).toBe('DELETE /notes/trash');
    expect(trashList()).toEqual([]);
    expect(activeList()?.map(n => n.id)).toEqual(['a']);
    expect(onSuccess).toHaveBeenCalledWith({ deletedCount: 1 });
  });
});
