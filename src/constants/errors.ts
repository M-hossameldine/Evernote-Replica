/** User-facing messages keyed by API error `code` (backend or client codes). */
export const ErrorsMap: { [key: string]: string } = {
  GENERIC_ERROR_MESSAGE: 'Something went wrong!',

  // Auth
  AUTH_INVALID_CREDENTIALS: 'Incorrect email or password',
  AUTH_EMAIL_IN_USE: 'Email already exists',
  RATE_LIMITED: 'Too many attempts, try again later',

  // Notes
  NOTE_NOT_FOUND: 'This note no longer exists',
  NOTE_IN_TRASH: 'Restore the note from the trash to edit it',
  NOTE_NOT_IN_TRASH: 'Move the note to the trash before deleting it',
  PAYLOAD_TOO_LARGE: 'This note is too large to save',

  // Generic
  VALIDATION_ERROR: 'Some of the information is invalid',
  INTERNAL_ERROR: 'Something went wrong on our side, please try again',
  SERVICE_UNAVAILABLE: 'The service is unavailable, please try again later',

  // Client-side (no valid response from the server)
  NETWORK_ERROR: 'Could not reach the server, check your connection',
  TIMEOUT_ERROR: 'The server took too long to respond',
  HTTP_ERROR: 'Something went wrong!',
  PARSING_ERROR: 'Something went wrong!',
  UNKNOWN_ERROR: 'Something went wrong!',
};

/** Mapped message for the code, else the server's message, else generic. */
export const getErrorMessage = (error: { code?: string; message?: string }) =>
  (error.code && ErrorsMap[error.code]) ||
  error.message ||
  ErrorsMap.GENERIC_ERROR_MESSAGE;
