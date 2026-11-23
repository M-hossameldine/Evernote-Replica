import { useEffect, useState } from 'react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {
  appApi,
  createOnQueryStarted,
  refreshSession,
  useAppSelector,
} from '~store';
import type { AppDispatch } from '~store/store';

import { selectIsLoggedIn } from '../local/authSlice';
import type {
  AuthRequestResult,
  AuthResponseDto,
  LoginRequestParams,
  LogoutRequestParams,
  RegisterRequestParams,
  RestoreSessionResult,
} from './authApis.interfaces';
import { mapAuthResponse } from './authApis.mapping';
import { endSession, startSession } from './authSession';

/** The app base query (`baseQueryWithReauth`); `queryFn` gets it bound. */
type ApiBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

/**
 * Sends an auth request, starts the session from the response and returns
 * only the user. The access token never enters the RTK Query cache.
 */
const authRequest =
  <TParams extends LoginRequestParams | RegisterRequestParams>(url: string) =>
  async (
    { payload }: TParams,
    api: { dispatch: AppDispatch },
    _extraOptions: unknown,
    baseQuery: (args: string | FetchArgs) => ReturnType<ApiBaseQuery>
  ) => {
    const result = await baseQuery({ url, method: 'POST', body: payload });
    if (result.error) return { error: result.error };

    const dto = result.data as AuthResponseDto;
    startSession(api.dispatch, dto);
    return { data: mapAuthResponse(dto) };
  };

export const authApi = appApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<AuthRequestResult, RegisterRequestParams>({
      queryFn: authRequest<RegisterRequestParams>('/auth/register'),
      onQueryStarted: createOnQueryStarted(),
    }),

    login: builder.mutation<AuthRequestResult, LoginRequestParams>({
      queryFn: authRequest<LoginRequestParams>('/auth/login'),
      onQueryStarted: createOnQueryStarted(),
    }),

    logout: builder.mutation<null, LogoutRequestParams>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      // The local session ends even if the server call fails.
      onQueryStarted: async (
        { onSuccess, onError, onSettled },
        { dispatch, queryFulfilled }
      ) => {
        await createOnQueryStarted()(
          {
            onSuccess,
            onError,
            onSettled: () => {
              endSession(dispatch);
              onSettled?.();
            },
          },
          { queryFulfilled }
        );
      },
    }),

    /** Exchanges the refresh cookie for a session. Replaces onAuthStateChanged. */
    restoreSession: builder.mutation<RestoreSessionResult, void>({
      queryFn: async (_arg, api) => {
        const session = await refreshSession(api);
        if (!session) return { data: null };

        const dto = session as AuthResponseDto;
        startSession(api.dispatch as AppDispatch, dto);
        return { data: mapAuthResponse(dto) };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRestoreSessionMutation,
} = authApi;

/** Restores the session once on app start (the page may have been reloaded). */
export const useInitAppAuth = () => {
  const isAuthorized = useAppSelector(selectIsLoggedIn);
  const [restoreSession] = useRestoreSessionMutation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Safe under StrictMode's double effect: concurrent refreshes share one
    // request (see refreshSession).
    restoreSession().finally(() => setIsLoading(false));
  }, [restoreSession]);

  return { isAuthorized, isLoading };
};
