import {
  createListenerMiddleware,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '~constants/errors';
import { saveLogout } from '~modules/auth/data/local/authSlice';

import { appApi } from './Apis/appApis';
import type { ApiError } from './Apis/appApis.interfaces';
import { SESSION_ERROR_CODES } from './Apis/baseQuery';
import { clearAccessToken } from './Apis/tokenStore';
import { showNotification } from './ui-slice/ui-slice';

export const listenerMiddleware = createListenerMiddleware();

/**
 * Every logout (user action or expired session) drops the access token and
 * all cached server data, so the next user never sees the previous one's
 * notes.
 */
listenerMiddleware.startListening({
  actionCreator: saveLogout,
  effect: (_action, { dispatch }) => {
    clearAccessToken();
    dispatch(appApi.util.resetApiState());
  },
});

type RejectedApiAction = AnyAction & {
  payload?: { data?: Partial<ApiError> };
  meta?: { arg?: { originalArgs?: unknown } };
};

const isApiRejection = (action: AnyAction): action is RejectedApiAction =>
  isRejectedWithValue(action) &&
  action.type.startsWith(`${appApi.reducerPath}/`);

const callerHandlesErrors = (action: RejectedApiAction) => {
  const args = action.meta?.arg?.originalArgs;
  return typeof args === 'object' && args !== null && 'onError' in args;
};

/**
 * Shows a toast for API errors nobody handles. A request that passes
 * `onError` (e.g. the auth form) shows its own errors. Session errors are
 * already reported by the base query when it logs the user out.
 */
listenerMiddleware.startListening({
  predicate: isApiRejection,
  effect: (action, { dispatch }) => {
    const rejected = action as RejectedApiAction;
    if (callerHandlesErrors(rejected)) return;

    const error = rejected.payload?.data;
    if (error?.code && SESSION_ERROR_CODES.includes(error.code)) return;

    dispatch(
      showNotification({
        status: 'error',
        message: getErrorMessage(error ?? {}),
      })
    );
  },
});
