import { appApi, createOnQueryStarted } from '~store';
import type { AppDispatch, RootState } from '~store/store';
import type { Note, NoteContent } from '~modules/notes/domain/interfaces';

import type {
  AddNoteRequestParams,
  DeleteNotePermanentlyRequestParams,
  EmptyTrashRequestParams,
  EmptyTrashRequestResult,
  MoveNoteToTrashRequestParams,
  RestoreNoteRequestParams,
  UpdateNoteRequestParams,
} from './notesApis.interfaces';
import { mapNoteDtoToNote, mapNoteDtos } from './notesApis.mapping';

/**
 * The RTK Query cache is the single source of truth for notes: one list per
 * status. Mutations patch those lists from the server response (and
 * optimistically where it helps), instead of refetching both lists after
 * every change.
 */
export const notesApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getActiveNotes: builder.query<Note[], void>({
      query: () => ({ url: '/notes', params: { status: 'active' } }),
      transformResponse: mapNoteDtos,
      providesTags: ['active-notes'],
    }),

    getTrashNotes: builder.query<Note[], void>({
      query: () => ({ url: '/notes', params: { status: 'trash' } }),
      transformResponse: mapNoteDtos,
      providesTags: ['trash-notes'],
    }),

    addNote: builder.mutation<Note, AddNoteRequestParams>({
      query: ({ payload }) => ({
        url: '/notes',
        method: 'POST',
        body: payload,
      }),
      transformResponse: mapNoteDtoToNote,
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(
          ({ data: note }) =>
            dispatch(updateActiveNotes(list => void list.unshift(note))),
          () => undefined
        );
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),

    /**
     * Saves edits. The editor already shows them and has patched the cached
     * list (see `patchCachedActiveNote`), so only `updatedAt` is taken from
     * the response: the user may have typed more since this request left.
     */
    updateNote: builder.mutation<Note, UpdateNoteRequestParams>({
      query: ({ payload, extraParams: { noteId } }) => ({
        url: `/notes/${noteId}`,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: mapNoteDtoToNote,
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(
          ({ data: note }) =>
            dispatch(
              updateActiveNotes(list => {
                const cached = list.find(item => item.id === note.id);
                if (cached) cached.updatedAt = note.updatedAt;
              })
            ),
          () => undefined
        );
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),

    moveNoteToTrash: builder.mutation<Note, MoveNoteToTrashRequestParams>({
      query: ({ extraParams: { noteId } }) => ({
        url: `/notes/${noteId}/trash`,
        method: 'POST',
      }),
      transformResponse: mapNoteDtoToNote,
      onQueryStarted: async (params, api) => {
        const { noteId } = params.extraParams;
        const { dispatch, getState, queryFulfilled } = api;
        const cached = notesApi.endpoints.getActiveNotes
          .select()(getState() as RootState)
          .data?.find(note => note.id === noteId);

        // Move it to the trash list right away, so the open editor keeps
        // showing it (read-only) instead of losing it until the reply.
        const patches = [dispatch(updateActiveNotes(removeNote(noteId)))];
        if (cached) {
          const trashed: Note = {
            ...cached,
            status: 'trash',
            deletedAt: new Date().toISOString(),
          };
          patches.push(dispatch(updateTrashNotes(upsertFirst(trashed))));
        }

        queryFulfilled.then(
          ({ data: note }) => dispatch(updateTrashNotes(upsertFirst(note))),
          () => undoAll(patches)
        );
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),

    restoreNote: builder.mutation<Note, RestoreNoteRequestParams>({
      query: ({ extraParams: { noteId } }) => ({
        url: `/notes/${noteId}/restore`,
        method: 'POST',
      }),
      transformResponse: mapNoteDtoToNote,
      onQueryStarted: async (params, api) => {
        const { noteId } = params.extraParams;
        const { dispatch, getState, queryFulfilled } = api;
        const cached = notesApi.endpoints.getTrashNotes
          .select()(getState() as RootState)
          .data?.find(note => note.id === noteId);

        const patches = [dispatch(updateTrashNotes(removeNote(noteId)))];
        if (cached) {
          const restored: Note = {
            ...cached,
            status: 'active',
            deletedAt: null,
          };
          patches.push(dispatch(updateActiveNotes(upsertFirst(restored))));
        }

        queryFulfilled.then(
          ({ data: note }) => dispatch(updateActiveNotes(upsertFirst(note))),
          () => undoAll(patches)
        );
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),

    deleteNotePermanently: builder.mutation<
      null,
      DeleteNotePermanentlyRequestParams
    >({
      query: ({ extraParams: { noteId } }) => ({
        url: `/notes/${noteId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const { noteId } = params.extraParams;
        const patch = dispatch(updateTrashNotes(removeNote(noteId)));

        queryFulfilled.catch(() => patch.undo());
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),

    emptyTrash: builder.mutation<
      EmptyTrashRequestResult,
      EmptyTrashRequestParams
    >({
      query: () => ({ url: '/notes/trash', method: 'DELETE' }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const patch = dispatch(updateTrashNotes(() => [] as Note[]));

        queryFulfilled.catch(() => patch.undo());
        await createOnQueryStarted()(params, { queryFulfilled });
      },
    }),
  }),
  overrideExisting: false,
});

// * Cache helpers

type NotesRecipe = (list: Note[]) => void | Note[];

const updateActiveNotes = (recipe: NotesRecipe) =>
  notesApi.util.updateQueryData('getActiveNotes', undefined, recipe);

const updateTrashNotes = (recipe: NotesRecipe) =>
  notesApi.util.updateQueryData('getTrashNotes', undefined, recipe);

const removeNote = (noteId: string) => (list: Note[]) =>
  list.filter(note => note.id !== noteId);

/** Replaces the note if it is in the list, otherwise puts it first. */
const upsertFirst = (note: Note) => (list: Note[]) => {
  const index = list.findIndex(item => item.id === note.id);
  if (index === -1) list.unshift(note);
  else list[index] = note;
};

const undoAll = (patches: { undo: () => void }[]) =>
  [...patches].reverse().forEach(patch => patch.undo());

/**
 * Applies unsaved edits to the cached active list right away, so the sidebar
 * previews follow the editor while the save is debounced.
 */
export const patchCachedActiveNote = (
  dispatch: AppDispatch,
  noteId: string,
  changes: Partial<NoteContent>
) =>
  dispatch(
    updateActiveNotes(list => {
      const cached = list.find(note => note.id === noteId);
      if (cached) Object.assign(cached, changes);
    })
  );

export const {
  useGetActiveNotesQuery,
  useGetTrashNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useMoveNoteToTrashMutation,
  useRestoreNoteMutation,
  useDeleteNotePermanentlyMutation,
  useEmptyTrashMutation,
} = notesApi;
