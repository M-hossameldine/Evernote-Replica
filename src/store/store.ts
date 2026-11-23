import { configureStore } from '@reduxjs/toolkit';

import { appApi } from './Apis/appApis';

import authReducer from '../modules/auth/data/local/authSlice';
import uiReducer from './ui-slice/ui-slice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    // Server state (notes, ...) lives in the RTK Query cache.
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(appApi.middleware),
});

// Infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
