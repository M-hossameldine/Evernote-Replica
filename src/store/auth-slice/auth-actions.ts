import { Dispatch } from 'redux';
import { login, logout } from '../index';
import { authRequest } from '../../apis';

let logoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {});

// receives expiration date in milliseconds as an ISO String
const calculateRemainingTime = (expirationTime: string) => {
  const currrentDate = new Date().getTime(); // current date in millisec
  const expirationDate = new Date(expirationTime).getTime(); // expiration date in millisec
  const remainingTime = expirationDate - currrentDate;

  return remainingTime; // remaining time in millisec
};

// chain logout thunk
const _logoutThunkHelper = async (dispatch: Dispatch) => {
  dispatch(logout());
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');

  // clear the auto logout time when logging out
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};

export const userLogoutThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    // clear the auto logout time when logging out
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};

export const userLoginThunk = (
  email: string,
  password: string,
  url: string,
  successHandler?: () => any
) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await authRequest(email, password, url);
      // console.log('data', response.data);

      return response;
    };

    try {
      const response = await sendRequest();

      // for successful authentication

      // calculate token expiration time
      const expirationTime = new Date(
        new Date().getTime() + +response.data.expiresIn * 1000
      ).toISOString();

      // Save auth data in local storage to preserve login
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationTime', expirationTime);

      // set time to auto logout
      const remainingTime = calculateRemainingTime(expirationTime);
      logoutTimer = setTimeout(
        () => _logoutThunkHelper(dispatch),
        remainingTime
      );
      if (successHandler) successHandler();

      dispatch(login(response.data));
    } catch (error: any) {
      console.log('error', error.response.data.error.message);
    }
  };
};
