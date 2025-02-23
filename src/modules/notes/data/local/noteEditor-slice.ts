import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~store';

interface NoteEditorState {
  activeNoteIndex: number;
  defaultActive: boolean; // view the first note
}

const initialState: NoteEditorState = {
  activeNoteIndex: 0,
  defaultActive: true,
};

const NoteEditorSlice = createSlice({
  name: 'noteEditor',
  initialState,
  reducers: {
    fillNoteEditor(state) {
      state.defaultActive = false;
    },
    resetNoteEditor(state) {
      Object.assign(state, initialState);
    },
    setActiveNoteIndex(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;

      state.activeNoteIndex = index;
    },
  },
});

export const { fillNoteEditor, setActiveNoteIndex } = NoteEditorSlice.actions;

export const selectNoteEditor = (state: RootState) => state.noteEditor;

export default NoteEditorSlice.reducer;
