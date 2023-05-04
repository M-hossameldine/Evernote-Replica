import { Dispatch } from "redux";
import { login, logout } from "../index";
import { authRequest } from "../../apis";

export let logoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {});

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
const _logoutThunkHelper = async (dispatch: Dispatch) => {
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

export const userLoginThunk = (
  email: string,
  password: string,
  url: string,
  successHandler?: () => any
) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await authRequest(email, password, url);

      return response;
    };

    try {
      const response = await sendRequest();

      /* for successful authentication */

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
        () => _logoutThunkHelper(dispatch),
        remainingTime
      );

      // apply additional functionalities in successful case
      if (successHandler) successHandler();

      dispatch(login(response.data));
    } catch (error: any) {
      console.log("error", error.response.data.error.message);
    }
  };
};
