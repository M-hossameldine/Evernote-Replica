import { useCallback, useState } from 'react';
import type { RequestParams, ApiError } from 'store/api.interfaces';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';

interface UseDataSourceState<RESULT> {
  data: RESULT | null;
  isLoading: boolean;
  error: ApiError | null;
  isError: boolean;
}

type OnQueryFinishedProps<PAYLOAD, RESULT> = {
  dispatch: Dispatch;
  state: RootState;
  payload: PAYLOAD | undefined;
  response: {
    result: RESULT;
    error: ApiError | undefined;
    isSuccess: boolean;
    isError: boolean;
  };
};

type UseDataSourceMutationProps<
  PAYLOAD = void,
  EXTRA_PARAMS = void,
  RESPONSE_DATA = any,
  RESULT = any,
> = {
  apiEndpoint: (props: {
    payload: PAYLOAD;
    extraParams: EXTRA_PARAMS;
  }) => Promise<RESPONSE_DATA>;
  mapResponseData?: (responseData: RESPONSE_DATA) => RESULT;
  onQueryFinished?: (props: OnQueryFinishedProps<PAYLOAD, RESULT>) => void;
};

type UseDataSourceMutationReturn<
  PAYLOAD = any,
  EXTRA_PARAMS = any,
  RESULT = any,
> = [
  (params: RequestParams<PAYLOAD, EXTRA_PARAMS, RESULT>) => Promise<RESULT>, // TODO: UPDATE the promise return to indicate that the result might be error (real world scenario)
  UseDataSourceState<RESULT>,
];

export const useDataSourceMutation = <
  PAYLOAD,
  EXTRA_PARAMS,
  RESPONSE_DATA,
  RESULT,
>(
  props: UseDataSourceMutationProps<PAYLOAD, EXTRA_PARAMS, RESPONSE_DATA>
): UseDataSourceMutationReturn<PAYLOAD, EXTRA_PARAMS, RESULT> => {
  const { apiEndpoint, mapResponseData, onQueryFinished } = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);

  const [endpointState, setEndpointState] = useState<
    UseDataSourceState<RESULT>
  >({
    data: null,
    isLoading: false,
    error: null,
    isError: false,
  });

  const fetchData = useCallback(
    async (props: RequestParams<PAYLOAD, EXTRA_PARAMS, RESULT>) => {
      const { onSuccess, onError, onSettled } = props;
      const payload = 'payload' in props ? props.payload : undefined;
      const extraParams =
        'extraParams' in props ? props.extraParams : undefined;

      setEndpointState(prev => ({ ...prev, isLoading: true }));

      let resultData;
      let resultError;
      let isSuccess = false;
      let isError = false;

      try {
        const data = await apiEndpoint({
          payload: payload as PAYLOAD,
          extraParams: extraParams as EXTRA_PARAMS,
        });

        const mappedData = mapResponseData ? mapResponseData(data) : data;

        setEndpointState(prev => ({
          ...prev,
          isLoading: false,
          data: mappedData,
          error: null,
          isError: false,
        }));

        onSuccess?.(mappedData);
        isSuccess = true;

        resultData = mappedData;
      } catch (error: unknown) {
        const apiError = error as ApiError;

        const formattedError = {
          message: apiError?.code,
          code: apiError?.code,
        };

        resultError = formattedError;

        setEndpointState(prev => ({
          ...prev,
          isLoading: false,
          isError: true,
          error: formattedError,
        }));

        isError = true;
        onError?.(formattedError);
      } finally {
        onSettled?.();
      }

      onQueryFinished?.({
        dispatch,
        state,
        payload,
        response: {
          isSuccess,
          isError,
          result: resultData,
          error: resultError,
        },
      });
      return resultData;
    },
    [apiEndpoint, mapResponseData, dispatch, state]
  );

  return [fetchData, endpointState];
};
