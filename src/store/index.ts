import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './notes-slice/notes-slice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

// Infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {notes: NoteState}
export type AppDispatch = typeof store.dispatch;

export default store;
