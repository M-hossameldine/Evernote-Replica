import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { authApi } from "./authApiSlice";

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

interface AUTH_STATE_INTERFACE {
  email: string;
  token: string;
  isLoggedIn: boolean;
  userId: string;
  hasError: boolean;
  errorMsgCode: string;
}

const initialState: AUTH_STATE_INTERFACE = {
  email: "",
  token: "",
  isLoggedIn: false,
  userId: "",
  hasError: false,
  errorMsgCode: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
    },
    logout: (state) => {
      state.token = "null";
      state.isLoggedIn = false;
      state.userId = "";
      state.email = "";
    },
    resetAuthErrors: (state) => {
      state.hasError = false;
      state.errorMsgCode = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { idToken, localId, email } = payload;

          // reset error
          state.hasError = false;
          state.errorMsgCode = "";

          state.email = email;
          state.isLoggedIn = true;
          state.token = idToken;
          state.userId = localId;
        },
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { payload }) => {
          const loginError: ErrorType = payload;
          const loginErrorMsg = loginError?.error?.data?.message;

          state.hasError = true;
          state.errorMsgCode = loginErrorMsg || "GENERIC_ERROR_MESSAGE";
        },
      );
  },
});

export const { setToken, logout, resetAuthErrors } = AuthSlice.actions;

export const selectUserEmail = (state: RootState) => state.auth.email;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectHasAuthError = (state: RootState) => state.auth.hasError;
export const selectAuthErrorMsgCode = (state: RootState) =>
  state.auth.errorMsgCode;

export default AuthSlice.reducer;
