import { useEffect, useState } from 'react';
import { useAppDispatch } from '~hooks';

import { auth, onAuthStateChanged } from '~libs/firebase';
import type { User } from '~modules/auth/domain/models';
import { appApi, createOnQueryStarted, createQuery } from '~store';

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
    signup: builder.mutation<any, AuthRequestParams>({
      queryFn: async params => {
        return await createQuery({
          endpoint: signUp,
          requestParams: params,
        });
      },
      onQueryStarted: async (
        { onSuccess, onError, onSettled }: any,
        { dispatch, queryFulfilled }: any
      ) => {
        const onSuccessCustom = (data: AuthRequestResponse) => {
          const mappedData = mapAuthRequestResult(data);

          dispatch(saveLogin(mappedData));
          onSuccess?.(mappedData);
        };

        await createOnQueryStarted()(
          { onSuccess: onSuccessCustom, onError, onSettled },
          { dispatch, queryFulfilled }
        );
      },
    }),
    login: builder.mutation<any, AuthRequestParams>({
      queryFn: async params => {
        return await createQuery({
          endpoint: login,
          requestParams: params,
        });
      },
      onQueryStarted: async (
        { onSuccess, onError, onSettled }: any,
        { dispatch, queryFulfilled }: any
      ) => {
        const onSuccessCustom = (data: AuthRequestResponse) => {
          const mappedData = mapAuthRequestResult(data);

          dispatch(saveLogin(mappedData));
          onSuccess?.(mappedData);
        };

        await createOnQueryStarted()(
          { onSuccess: onSuccessCustom, onError, onSettled },
          { dispatch, queryFulfilled }
        );
      },
    }),
    logout: builder.mutation<any, LogoutRequestParams>({
      queryFn: async params => {
        return await createQuery({
          endpoint: logout,
          requestParams: params,
        });
      },
      onQueryStarted: async (
        { onSuccess, onError, onSettled }: any,
        { dispatch, queryFulfilled }: any
      ) => {
        const onSuccessCustom = () => {
          dispatch(saveLogout());
          onSuccess?.();
        };

        await createOnQueryStarted()(
          { onSuccess: onSuccessCustom, onError, onSettled },
          { dispatch, queryFulfilled }
        );
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApi;
