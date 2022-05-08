import axios from 'axios';

import { LOGIN_ENDPOINT, CHANGE_PASSWORD_ENDPOINT } from '../constants';

// login/signup requests
export const authRequest = async (
  email: string,
  password: string,
  url: string
) => {
  const response = await axios({
    method: 'POST',
    url: url,
    data: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/',
    },
  });

  console.log('auth api', response);
  return response;
};

export const changePasswordRequest = async (
  idToken: string,
  password: string,
  returnSecureToken?: boolean
) => {
  const response = await axios({
    method: 'POST',
    url: CHANGE_PASSWORD_ENDPOINT,
    data: JSON.stringify({
      idToken,
      password,
      returnSecureToken: !!returnSecureToken,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
