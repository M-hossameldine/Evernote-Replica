import { useEffect, useState } from 'react';

import { auth, onAuthStateChanged } from '~libs/firebase';
import type { User } from '~modules/auth/domain/models';
import { appApi, createEndpoint, useAppDispatch } from '~store';

import { saveLogin, saveLogout } from '../local/authSlice';
import { login, logout, signUp } from './authApis.endpoints';
import type {
  AuthRequestParams,
  AuthRequestResponse,
  LogoutRequestParams,
} from './authApis.interfaces';
import {
  mapAuthRequestResult,
  mapFirebaseUserToAuthUser,
} from './authApis.mapping';

export const useInitAppAuth = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      const authUser = user ? mapFirebaseUserToAuthUser(user) : null;
      setUser(authUser);
      dispatch(saveLogin({ user: authUser }));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthorized, isLoading };
};

export const authApi = appApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<AuthRequestResponse, AuthRequestParams>(
      createEndpoint<AuthRequestResponse, AuthRequestParams, false>({
        endpoint: signUp,
        mapData: mapAuthRequestResult,
        onQuerySuccess: (dispatch, mappedData) =>
          dispatch(saveLogin(mappedData)),
        requiresAuth: false,
      })
    ),

    login: builder.mutation<AuthRequestResponse, AuthRequestParams>(
      createEndpoint<AuthRequestResponse, AuthRequestParams, false>({
        endpoint: login,
        mapData: mapAuthRequestResult,
        onQuerySuccess: (dispatch, mappedData) =>
          dispatch(saveLogin(mappedData)),
        requiresAuth: false,
      })
    ),

    logout: builder.mutation<void, LogoutRequestParams>(
      createEndpoint<void, LogoutRequestParams>({
        endpoint: logout,
        onQuerySuccess: dispatch => dispatch(saveLogout()),
      })
    ),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApi;
