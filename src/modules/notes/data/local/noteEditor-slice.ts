import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store";
import { addNote } from "./notes-slice";
import { NOTE_INTERFACE } from "interfaces";

interface NoteEditorState {
  activeNoteIndex: number;
  defaultActive: boolean; // view the first note
}

const initialState: NoteEditorState = {
  activeNoteIndex: 0,
  defaultActive: true,
};

const NoteEditorSlice = createSlice({
  name: "noteEditor",
  initialState,
  reducers: {
    fillNoteEditor(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      state.defaultActive = false;
    },
    resetNoteEditor(state) {
      state = initialState;
    },
    setActiveNoteIndex(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;

      state.activeNoteIndex = index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote, (state, action: PayloadAction<NOTE_INTERFACE>) => {
      // todo: check if this extra reducer is still needed
    });
  },
});

export const { fillNoteEditor, setActiveNoteIndex } = NoteEditorSlice.actions;

export const selectNoteEditor = (state: RootState) => state.noteEditor;

export default NoteEditorSlice.reducer;
