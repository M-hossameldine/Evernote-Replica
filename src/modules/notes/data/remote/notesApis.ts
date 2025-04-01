import { appApi, createEndpoint } from '~store';

import {
  addNote,
  deleteNote,
  getActiveNotes,
  getTrashNotes,
  updateNote,
  clearTrashNotes,
} from './notesApis.endpoints';
import type {
  GetActiveNotesRequestResponse,
  GetActiveNotesRequestParams,
  GetTrashNotesRequestResponse,
  GetTrashNotesRequestParams,
  AddNoteRequestParams,
  UpdateNoteRequestParams,
  UpdateNoteRequestResponse,
  DeleteNoteRequestParams,
  ClearTrashNotesRequestParams,
  ClearTrashNotesRequestResponse,
} from './notesApis.interfaces';

import { saveActiveNotes, saveTrashNotes } from '../local';

export const notesApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getActiveNotes: builder.query<
      GetActiveNotesRequestResponse,
      GetActiveNotesRequestParams
    >({
      ...createEndpoint<
        GetActiveNotesRequestResponse,
        GetActiveNotesRequestParams
      >({
        endpoint: getActiveNotes,
        onQuerySuccess: (dispatch, mappedData) => {
          dispatch(saveActiveNotes(mappedData));
        },
      }),
      providesTags: ['active-notes'],
    }),
    getTrashNotes: builder.query<
      GetTrashNotesRequestResponse,
      GetTrashNotesRequestParams
    >({
      ...createEndpoint<
        GetTrashNotesRequestResponse,
        GetTrashNotesRequestParams
      >({
        endpoint: getTrashNotes,
        onQuerySuccess: (dispatch, mappedData) =>
          dispatch(saveTrashNotes(mappedData)),
      }),
      providesTags: ['trash-notes'],
    }),
    addNote: builder.mutation<any, AddNoteRequestParams>({
      ...createEndpoint<any, AddNoteRequestParams>({
        endpoint: addNote,
      }),
      invalidatesTags: ['active-notes'],
    }),
    updateNote: builder.mutation<
      UpdateNoteRequestResponse,
      UpdateNoteRequestParams
    >({
      ...createEndpoint<UpdateNoteRequestResponse, UpdateNoteRequestParams>({
        endpoint: updateNote,
      }),
      invalidatesTags: ['active-notes'],
    }),
    deleteNote: builder.mutation<any, DeleteNoteRequestParams>({
      ...createEndpoint<any, DeleteNoteRequestParams>({
        endpoint: deleteNote,
      }),
      invalidatesTags: ['trash-notes', 'active-notes'],
    }),
    clearTrashNotes: builder.mutation<
      ClearTrashNotesRequestResponse,
      ClearTrashNotesRequestParams
    >({
      ...createEndpoint<
        ClearTrashNotesRequestResponse,
        ClearTrashNotesRequestParams
      >({
        endpoint: clearTrashNotes,
      }),
      invalidatesTags: ['trash-notes'],
    }),
  }),
  // Define overrideExisting to ensure endpoints aren't duplicated
  overrideExisting: false,
});

export const {
  useGetActiveNotesQuery,
  useGetTrashNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useClearTrashNotesMutation,
} = notesApi;
