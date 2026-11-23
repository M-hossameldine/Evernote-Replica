const DEFAULT_API_URL = 'http://localhost:4000/api/v1';

/** Base URL of the REST API, including the `/api/v1` prefix. */
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/+$/, '');

/** Refresh endpoint, authenticated by the httpOnly `refresh_token` cookie. */
export const REFRESH_PATH = '/auth/refresh';

/** Web Locks name used to serialize refreshes across tabs. */
export const REFRESH_LOCK_NAME = 'evernote-replica:auth-refresh';
