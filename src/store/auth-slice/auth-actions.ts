import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../index";
import { authRequest } from "../../apis";

interface userLoginProps {
  email: string;
  password: string;
  url: string;
  successHandler?: () => any;
}

let logoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {});

// to allow initilizing the logoutTimer from the useTokenData hook
export const setLogoutTimer = (logoutTimerValue: () => NodeJS.Timeout) => {
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
export const _logoutThunkHelper = async (dispatch: Dispatch) => {
  dispatch(logout());
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");

  // clear the auto logout time when logging out
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};

export const userLogoutThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // clear the auto logout time when logging out
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (
    { email, password, url, successHandler }: userLoginProps,
    thunkApi
  ) => {
    try {
      const response = await authRequest(email, password, url);

      // calculate token expiration time
      const expirationTime = new Date(
        new Date().getTime() + +response.data.expiresIn * 1000
      ).toISOString();

      // Save auth data in local storage to preserve login
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationTime", expirationTime);

      // set auto logout timer
      const remainingTime = calculateRemainingTime(expirationTime);
      logoutTimer = setTimeout(
        () => _logoutThunkHelper(thunkApi.dispatch),
        remainingTime
      );

      if (successHandler) successHandler();

      return response.data;
    } catch (err: any) {
      throw new Error(err.response.data.error.message);
    }
  }
);
