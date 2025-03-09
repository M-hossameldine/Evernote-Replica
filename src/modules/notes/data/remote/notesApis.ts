import { appApi, createEndpoint } from '~store';

import { addNote } from './notesApis.endpoints';
import type { AddNoteRequestParams } from './notesApis.interfaces';

export const notesApi = appApi.injectEndpoints({
  endpoints: builder => ({
    addNote: builder.mutation<any, AddNoteRequestParams>(
      createEndpoint<any, AddNoteRequestParams>({
        endpoint: addNote,
      })
    ),
  }),
});

export const { useAddNoteMutation } = notesApi;
