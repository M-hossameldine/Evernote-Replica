import { store } from '~store';
import { selectUser } from '~modules/auth/data/local';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  MutationRequestParams,
  QueryRequestParams,
  EndpointParamsWithAuth,
  EndpointParamsWithoutAuth,
} from './appApis.interfaces';

export const createQuery = async <
  T extends MutationRequestParams | QueryRequestParams,
  TAuth extends EndpointParamsWithAuth<T> | EndpointParamsWithoutAuth<T>,
>(props: {
  endpoint: (params: TAuth) => Promise<any>;
  requestParams: T;
  requiresAuth: boolean;
}) => {
  const { endpoint, requestParams, requiresAuth } = props;
  const endpointParams = { ...requestParams } as TAuth;

  if (requiresAuth) {
    const state = store.getState();
    const user = selectUser(state);

    if (!user) {
      return {
        error: {
          status: 401,
          data: {
            code: 'auth/unauthorized',
            message: 'User must be authenticated',
          },
        } as FetchBaseQueryError,
      };
    }

    (endpointParams as EndpointParamsWithAuth<T>).defaultParams = {
      user,
    };
  }

  try {
    const result = await endpoint(endpointParams);
    return { data: result };
  } catch (error: any) {
    return {
      error: {
        status: error.code,
        data: {
          code: error.code,
          message: error.code,
        },
      } as FetchBaseQueryError,
    };
  }
};

export const createOnQueryStarted =
  () =>
  async ({ onSuccess, onError, onSettled }: any, { queryFulfilled }: any) => {
    try {
      const response = await queryFulfilled;
      const { data } = response;

      onSuccess?.(data);
    } catch (error: any) {
      const responseErrorDetails = error?.error?.data;

      onError?.({
        code: responseErrorDetails?.code,
        message: responseErrorDetails?.message,
      });
    } finally {
      if (onSettled) onSettled();
    }
  };

interface CreateEndpointOptions<
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
  TRequiresAuth extends boolean,
> {
  endpoint: (
    params: TRequiresAuth extends true
      ? EndpointParamsWithAuth<TParams>
      : EndpointParamsWithoutAuth<TParams>
  ) => Promise<TResponse>;
  requiresAuth?: TRequiresAuth;
  mapData?: (
    data: TResponse
  ) => TParams extends
    | MutationRequestParams<infer R>
    | QueryRequestParams<infer R>
    ? R
    : TResponse;
  onQuerySuccess?: (
    dispatch: any,
    mappedData: TParams extends
      | MutationRequestParams<infer R>
      | QueryRequestParams<infer R>
      ? R
      : TResponse
  ) => void;
}

export const createEndpoint = <
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
  TRequiresAuth extends boolean = true,
>({
  endpoint,
  mapData = (data: TResponse) => data as any,
  onQuerySuccess,
  requiresAuth = true as TRequiresAuth,
}: CreateEndpointOptions<TResponse, TParams, TRequiresAuth>) => ({
  queryFn: async (params: TParams) => {
    return await createQuery({
      endpoint,
      requestParams: params,
      requiresAuth,
    });
  },
  onQueryStarted: async (
    { onSuccess: successHandler, onError, onSettled }: TParams,
    { dispatch, queryFulfilled }: any
  ) => {
    const onSuccessCustom = (data: TResponse) => {
      const mappedData = mapData(data);
      onQuerySuccess?.(dispatch, mappedData);
      successHandler?.(mappedData);
    };

    await createOnQueryStarted()(
      { onSuccess: onSuccessCustom, onError, onSettled },
      { dispatch, queryFulfilled }
    );
  },
});
