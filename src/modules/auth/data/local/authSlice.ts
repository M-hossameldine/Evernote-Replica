import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { AuthSliceState, SaveLoginActionPayload } from './authSlice.interfaces';

const initialState: AuthSliceState = {
  user: null,
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveLogin: (state, action: PayloadAction<SaveLoginActionPayload>) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = !!user;
    },
    saveLogout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { saveLogin, saveLogout } = AuthSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default AuthSlice.reducer;
