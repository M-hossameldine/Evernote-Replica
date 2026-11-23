import { store } from '~store';
import { selectUser } from '~modules/auth/data/local';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
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
        details: responseErrorDetails?.details,
        requestId: responseErrorDetails?.requestId,
      });
    } finally {
      if (onSettled) onSettled();
    }
  };

/** The result type a request's callbacks receive (after `mapData`). */
type MappedResult<TParams, TResponse> = TParams extends
  | MutationRequestParams<infer R>
  | QueryRequestParams<infer R>
  ? R
  : TResponse;

interface EndpointMappingOptions<TResponse, TParams> {
  mapData?: (data: TResponse) => MappedResult<TParams, TResponse>;
  onQuerySuccess?: (
    dispatch: any,
    mappedData: MappedResult<TParams, TResponse>
  ) => void;
}

/** Runs `mapData` / `onQuerySuccess`, then the caller's request callbacks. */
const createMappedOnQueryStarted =
  <TResponse, TParams extends MutationRequestParams | QueryRequestParams>({
    mapData = (data: TResponse) => data as any,
    onQuerySuccess,
  }: EndpointMappingOptions<TResponse, TParams>) =>
  async (
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
  };

interface CreateEndpointOptions<
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
  TRequiresAuth extends boolean,
> extends EndpointMappingOptions<TResponse, TParams> {
  endpoint: (
    params: TRequiresAuth extends true
      ? EndpointParamsWithAuth<TParams>
      : EndpointParamsWithoutAuth<TParams>
  ) => Promise<TResponse>;
  requiresAuth?: TRequiresAuth;
}

export const createEndpoint = <
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
  TRequiresAuth extends boolean = true,
>({
  endpoint,
  mapData,
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
  onQueryStarted: createMappedOnQueryStarted<TResponse, TParams>({
    mapData,
    onQuerySuccess,
  }),
});

interface CreateHttpEndpointOptions<
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
> extends EndpointMappingOptions<TResponse, TParams> {
  /** Builds the HTTP request (relative to `API_BASE_URL`) from the params. */
  request: (params: TParams) => string | FetchArgs;
}

/**
 * Endpoint backed by the REST API through `baseQueryWithReauth`: bearer
 * token, `{ data }` unwrapping, error normalization and token refresh are
 * handled there. Keeps the `onSuccess` / `onError` / `onSettled` callback API
 * of `createEndpoint`.
 *
 * @example
 * getNotes: builder.query<NoteDto[], GetNotesRequestParams>({
 *   ...createHttpEndpoint<NoteDto[], GetNotesRequestParams>({
 *     request: ({ queryParams }) => ({ url: '/notes', params: queryParams }),
 *     mapData: notes => notes.map(mapNoteDto),
 *   }),
 *   providesTags: ['active-notes'],
 * }),
 */
export const createHttpEndpoint = <
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
>({
  request,
  mapData,
  onQuerySuccess,
}: CreateHttpEndpointOptions<TResponse, TParams>) => ({
  query: (params: TParams) => request(params),
  onQueryStarted: createMappedOnQueryStarted<TResponse, TParams>({
    mapData,
    onQuerySuccess,
  }),
});
