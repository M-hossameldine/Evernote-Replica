import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';

export const appApi = createApi({
  reducerPath: 'api',
  // REST API client: bearer token, envelope unwrapping, token refresh.
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    // notes
    'active-notes',
    'trash-notes',
  ],
  endpoints: () => ({}),
});
