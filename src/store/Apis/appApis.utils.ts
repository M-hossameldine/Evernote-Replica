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
