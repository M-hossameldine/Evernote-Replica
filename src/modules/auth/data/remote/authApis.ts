import { auth, onAuthStateChanged } from '~libs/firebase';
import type { User } from '~modules/auth/domain/models';
import { useDataSourceMutation } from '~store/hooks';

import { useEffect, useState } from 'react';

import { useAppDispatch } from '~hooks';

import { saveLogin, saveLogout } from '../local/authSlice';
import { login, logout, signUp } from './authApis.helpers';
import type {
  AuthRequestPayload,
  AuthRequestResponse,
  AuthRequestResult,
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

export const useLogin = () => {
  return useDataSourceMutation<
    AuthRequestPayload,
    void,
    AuthRequestResponse,
    AuthRequestResult
  >({
    apiEndpoint: login,
    mapResponseData: mapAuthRequestResult,
    onQueryFinished: ({ dispatch, response }) => {
      if (response.isSuccess) {
        dispatch(saveLogin(response.result));
      }
    },
  });
};

export const useSignup = () => {
  return useDataSourceMutation<
    AuthRequestPayload,
    void,
    AuthRequestResponse,
    AuthRequestResult
  >({
    apiEndpoint: signUp,
    mapResponseData: mapAuthRequestResult,
    onQueryFinished: ({ dispatch, response }) => {
      if (response.isSuccess) {
        dispatch(saveLogin(response.result));
      }
    },
  });
};

export const useLogout = () => {
  return useDataSourceMutation<void, void, void, void>({
    apiEndpoint: logout,
    onQueryFinished: ({ dispatch, response }) => {
      if (response.isSuccess) {
        dispatch(saveLogout());
      }
    },
  });
};
