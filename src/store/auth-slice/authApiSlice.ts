import { apiSlice } from "store/apiSlice";
import { LOGIN_URL, SIGNUP_URL } from "utils/constants";
import { AppDispatch } from "store";
import { logout } from "../index";

type ErrorType =
  | {
      error: {
        status: number;
        data: {
          error: {
            code: number;
            message: string;
          };
        };
      };
    }
  | any;

let logoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => ({}));

// to allow initializing the logoutTimer from the useTokenData hook
export const setLogoutTimer = (
  logoutTimerValue: () => ReturnType<typeof setTimeout>,
) => {
  logoutTimer = logoutTimerValue();
};

// receives expiration date in milliseconds as an ISO String
export const calculateRemainingTime = (expirationTime: string) => {
  const currrentDate = new Date().getTime(); // current date in millisec
  const expirationDate = new Date(expirationTime).getTime(); // expiration date in millisec
  const remainingTime = expirationDate - currrentDate;

  return remainingTime; // remaining time in millisec
};

// chain logout thunk
export const _logoutThunkHelper = async (dispatch: AppDispatch) => {
  dispatch(logout());
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");

  // clear the auto logout time when logging out
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};

export const userLogoutThunk = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // clear the auto logout time when logging out
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: LOGIN_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }),
      async onQueryStarted(
        { onSuccess, onError },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;

          // calculate token expiration time
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000,
          ).toISOString();

          // Save auth data in local storage to preserve login
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("expirationTime", expirationTime);

          // set auto logout timer
          const remainingTime = calculateRemainingTime(expirationTime);

          logoutTimer = setTimeout(
            () => _logoutThunkHelper(dispatch),
            remainingTime,
          );

          if (onSuccess) {
            // onSuccess(data);
          }
        } catch (err: ErrorType) {
          if (onError) {
            onError({
              message: err?.error?.data?.message,
              status: err?.error?.status,
            });
          }
        }
      },
    }),
    signup: build.mutation({
      query: ({ email, password }) => ({
        url: SIGNUP_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
