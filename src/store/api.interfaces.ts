export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type ApiError = {
  code: string;
  message: string;
};

export type RequestCallbacks<RESULT = any> = {
  onSuccess?: (result: RESULT) => void;
  onError?: (error: ApiError) => void;
  onSettled?: () => void;
};

export type RequestParams<
  PAYLOAD = void,
  EXTRA_PARAMS = void,
  RESULT = any,
> = PAYLOAD extends void
  ? EXTRA_PARAMS extends void
    ? RequestCallbacks<RESULT> // If both PAYLOAD and EXTRA_PARAMS are void, disallow usage
    : RequestCallbacks<RESULT> & { extraParams: EXTRA_PARAMS } // If only PAYLOAD is void, allow EXTRA_PARAMS only
  : EXTRA_PARAMS extends void
    ? RequestCallbacks<RESULT> & { payload: PAYLOAD } // If only EXTRA_PARAMS is void, allow PAYLOAD only
    : RequestCallbacks<RESULT> & { extraParams: EXTRA_PARAMS } & {
        payload: PAYLOAD;
      }; // If PAYLOAD & EXTRA_PARAMS are provided, allow both of them
