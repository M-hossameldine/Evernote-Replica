import type { FetchArgs } from '@reduxjs/toolkit/query';
import type {
  MutationRequestParams,
  QueryRequestParams,
} from './appApis.interfaces';

/**
 * `onQueryStarted` that turns the request outcome into the caller's
 * `onSuccess` / `onError` / `onSettled` callbacks (passed in the request
 * params). Errors reach `onError` normalized by the base query.
 */
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

interface CreateHttpEndpointOptions<
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
> {
  /** Builds the HTTP request (relative to `API_BASE_URL`) from the params. */
  request: (params: TParams) => string | FetchArgs;
  mapData?: (data: TResponse) => MappedResult<TParams, TResponse>;
  /** Runs before the caller's `onSuccess`. `rawData` is the unmapped response. */
  onQuerySuccess?: (
    dispatch: any,
    mappedData: MappedResult<TParams, TResponse>,
    rawData: TResponse
  ) => void;
}

/**
 * Endpoint backed by the REST API through `baseQueryWithReauth` (bearer
 * token, `{ data }` unwrapping, error normalization and token refresh are
 * handled there), with the `onSuccess` / `onError` / `onSettled` callback API.
 *
 * For endpoints that patch the cache optimistically, write `query` and
 * `onQueryStarted` directly and call `createOnQueryStarted` (see notesApis).
 *
 * @example
 * updateMe: builder.mutation<User, UpdateMeRequestParams>(
 *   createHttpEndpoint<UserDto, UpdateMeRequestParams>({
 *     request: ({ payload }) => ({ url: '/users/me', method: 'PATCH', body: payload }),
 *     mapData: mapUserDtoToUser,
 *   })
 * ),
 */
export const createHttpEndpoint = <
  TResponse,
  TParams extends MutationRequestParams | QueryRequestParams,
>({
  request,
  mapData = (data: TResponse) => data as any,
  onQuerySuccess,
}: CreateHttpEndpointOptions<TResponse, TParams>) => ({
  query: (params: TParams) => request(params),
  onQueryStarted: async (
    { onSuccess: successHandler, onError, onSettled }: TParams,
    { dispatch, queryFulfilled }: any
  ) => {
    const onSuccessCustom = (data: TResponse) => {
      const mappedData = mapData(data);
      onQuerySuccess?.(dispatch, mappedData, data);
      successHandler?.(mappedData);
    };

    await createOnQueryStarted()(
      { onSuccess: onSuccessCustom, onError, onSettled },
      { queryFulfilled }
    );
  },
});
