import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { USER_AUTH_DATA_INTERFACE } from "../../interfaces";
import { loginThunk } from "./auth-actions";

interface AUTH_STATE_INTERFACE {
  token: string | null;
  isLoggedIn: boolean;
  userId: string;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const initialState: AUTH_STATE_INTERFACE = {
  token: "",
  isLoggedIn: false,
  userId: "",
  isLoading: false,
  hasError: false,
  errorMessage: "",
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
      state.token = null;
      state.isLoggedIn = false;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state = {
          ...state,
          isLoading: false,
          hasError: true,
          errorMessage: "Failed to login",
        };
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<USER_AUTH_DATA_INTERFACE>) => {
          const { idToken, localId } = action.payload;

          state.isLoading = false;
          state.hasError = false;
          state.errorMessage = "";
          state.isLoggedIn = true;
          state.token = idToken;
          state.userId = localId;
        }
      );
  },
});

export const { setToken, logout } = AuthSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectHasAuthError = (state: RootState) => state.auth.hasError;
export const selectAuthErrorMessage = (state: RootState) =>
  state.auth.errorMessage;

export default AuthSlice.reducer;
