import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';

export const appApi = createApi({
  reducerPath: 'api',
  // Used by `createHttpEndpoint` endpoints. Firebase endpoints built with
  // `createEndpoint` use `queryFn` and bypass it until they are migrated.
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    // notes
    'active-notes',
    'trash-notes',
  ],
  endpoints: () => ({}),
});
