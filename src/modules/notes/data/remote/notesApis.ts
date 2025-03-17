import { appApi, createEndpoint } from '~store';

import { addNote, getActiveNotes, getTrashNotes } from './notesApis.endpoints';
import type {
  GetActiveNotesRequestResponse,
  GetActiveNotesRequestParams,
  GetTrashNotesRequestResponse,
  GetTrashNotesRequestParams,
  AddNoteRequestParams,
} from './notesApis.interfaces';

import { saveActiveNotes, saveTrashNotes } from '../local';

export const notesApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getActiveNotes: builder.query<
      GetActiveNotesRequestResponse,
      GetActiveNotesRequestParams
    >(
      createEndpoint<
        GetActiveNotesRequestResponse,
        GetActiveNotesRequestParams
      >({
        endpoint: getActiveNotes,
        onQuerySuccess: (dispatch, mappedData) =>
          dispatch(saveActiveNotes(mappedData)),
      })
    ),
    getTrashNotes: builder.query<
      GetTrashNotesRequestResponse,
      GetTrashNotesRequestParams
    >(
      createEndpoint<GetTrashNotesRequestResponse, GetTrashNotesRequestParams>({
        endpoint: getTrashNotes,
        onQuerySuccess: (dispatch, mappedData) =>
          dispatch(saveTrashNotes(mappedData)),
      })
    ),
    addNote: builder.mutation<any, AddNoteRequestParams>(
      createEndpoint<any, AddNoteRequestParams>({
        endpoint: addNote,
      })
    ),
  }),
});

export const {
  useGetActiveNotesQuery,
  useGetTrashNotesQuery,
  useAddNoteMutation,
} = notesApi;
