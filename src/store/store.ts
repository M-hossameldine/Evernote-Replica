import { configureStore } from '@reduxjs/toolkit';

import { appApi } from './Apis/appApis';

import authReducer from '../modules/auth/data/local/authSlice';
import notesReducer from '~modules/notes/data/local/notesSlice';

import noteEditorReducer from '../modules/notes/data/local/noteEditor-slice';
import uiReducer from './ui-slice/ui-slice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    noteEditor: noteEditorReducer,
    ui: uiReducer,
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(appApi.middleware),
});

// Infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {notes: NoteState}
export type AppDispatch = typeof store.dispatch;
