import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  MutationRequestParams,
  QueryRequestParams,
} from './appApis.interfaces';

export const createQuery = async <
  T extends MutationRequestParams | QueryRequestParams,
>(props: {
  endpoint: (params: T) => Promise<any>;
  requestParams: T;
}) => {
  const { endpoint, requestParams } = props;

  try {
    const result = await endpoint(requestParams);
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
> {
  endpoint: (params: TParams) => Promise<TResponse>;
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
>({
  endpoint,
  mapData = (data: TResponse) => data as any,
  onQuerySuccess,
}: CreateEndpointOptions<TResponse, TParams>) => ({
  queryFn: async (params: TParams) => {
    return await createQuery({
      endpoint,
      requestParams: params,
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
