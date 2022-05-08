import { Dispatch } from 'redux';
import { login, logout } from '../shared-store';
import { authRequest } from '../../apis';

export const userLoginThunk = (
  email: string,
  password: string,
  url: string,
  successHandler?: () => void
) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await authRequest(email, password, url);
      console.log('data', response.data);
      return response;
    };

    try {
      const response = await sendRequest();

      localStorage.setItem('token', response.data.idToken);
      dispatch(login({ token: response.data.idToken }));

      if (successHandler) successHandler();
    } catch (error: any) {
      console.log('error', error.response.data.error.message);
    }
  };
};

export const userLogoutThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
    localStorage.removeItem('token');
  };
};
