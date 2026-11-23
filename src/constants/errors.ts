/** User-facing messages keyed by API error `code` (backend or client codes). */
export const ErrorsMap: { [key: string]: string } = {
  GENERIC_ERROR_MESSAGE: 'Something went wrong!',
  AUTH_INVALID_CREDENTIALS: 'Incorrect email or password',
  AUTH_EMAIL_IN_USE: 'Email already exists',
  RATE_LIMITED: 'Too many attempts, try again later',
  NETWORK_ERROR: 'Could not reach the server, check your connection',
  TIMEOUT_ERROR: 'The server took too long to respond',
};

export const getErrorMessage = (error: { code?: string; message?: string }) =>
  (error.code && ErrorsMap[error.code]) ||
  error.message ||
  ErrorsMap.GENERIC_ERROR_MESSAGE;
