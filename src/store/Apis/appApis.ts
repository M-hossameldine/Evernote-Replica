import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // the base url is not used in the app but it is required by the createApi function
  tagTypes: [
    // notes
    'active-notes',
    'trash-notes',
  ],
  endpoints: () => ({}),
});
