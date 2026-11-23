import { appApi, clearAccessToken, setAccessToken } from '~store/Apis';
import type { AppDispatch } from '~store/store';

import { saveLogin, saveLogout } from '../local/authSlice';
import type { AuthResponseDto } from './authApis.interfaces';
import { mapUserDtoToUser } from './authApis.mapping';

/**
 * Starts a session from an auth response (login / register / refresh).
 * The access token goes to the in-memory token store; only the user goes to
 * Redux. The refresh token is an httpOnly cookie the browser manages.
 */
export const startSession = (dispatch: AppDispatch, dto: AuthResponseDto) => {
  setAccessToken(dto.accessToken);
  dispatch(saveLogin({ user: mapUserDtoToUser(dto.user) }));
};

/** Ends the session locally and drops every cached API result. */
export const endSession = (dispatch: AppDispatch) => {
  clearAccessToken();
  dispatch(saveLogout());
  dispatch(appApi.util.resetApiState());
};
