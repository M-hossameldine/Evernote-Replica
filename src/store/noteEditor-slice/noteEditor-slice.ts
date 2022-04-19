import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

interface NoteEditorState {
  title: string;
  text: string;
  activeNoteId: string;
  activeNoteIndex: number;
  defaultActive: boolean; // view the first note
}

const initialState: NoteEditorState = {
  title: '',
  text: '',
  activeNoteId: '',
  activeNoteIndex: 0,
  defaultActive: true,
};

const NoteEditorSlice = createSlice({
  name: 'noteEditor',
  initialState,
  reducers: {
    fillNoteEditor(
      state,
      action: PayloadAction<{ title: string; text: string; id: string }>
    ) {
      const { title, text, id } = action.payload;

      state.title = title;
      state.text = text;
      state.activeNoteId = id;
      state.defaultActive = false;
    },
    resetNoteEditor(state) {
      state = initialState;
    },
  },
});

export const { fillNoteEditor } = NoteEditorSlice.actions;

export const selectNoteEditor = (state: RootState) => state.noteEditor;

export default NoteEditorSlice.reducer;
