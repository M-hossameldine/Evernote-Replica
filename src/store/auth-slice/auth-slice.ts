import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { USER_AUTH_DATA_INTERFACE } from '../../interfaces';

interface AUTH_STATE_INTERFACE {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AUTH_STATE_INTERFACE = {
  token: '',
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
    },
    // login: (state, action: PayloadAction<{ token: string }>) => {
    login: (state, action: PayloadAction<USER_AUTH_DATA_INTERFACE>) => {
      state.token = action.payload.idToken;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, login, logout } = AuthSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsloggedIn = (state: RootState) => state.auth.isLoggedIn;

export default AuthSlice.reducer;
