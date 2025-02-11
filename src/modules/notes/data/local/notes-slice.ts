import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NOTE_INTERFACE, createNote, TRASH_ITEM_INTERFACE } from "interfaces";
import { RootState } from "store";
import { restoreItem } from "./trash-slice";

const DUMMY_NOTE_lIST: NOTE_INTERFACE[] = [
  {
    id: "0",
    title: "1st Note Title",
    text: "1st Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "1",
    title: "2nd Note Title",
    text: "2nd Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "2",
    title: "3rd Note Title",
    text: "3rd Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "3",
    title: "4th Note Title",
    text: "4th Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "4",
    title: "5th Note Title",
    text: "5th Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "5",
    title: "6th Note Title",
    text: "6th Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
  {
    id: "6",
    title: "7th Note Title",
    text: "7th Note text body",
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: "",
  },
];

interface NotesState {
  notes: NOTE_INTERFACE[];
}

const initialState: NotesState = {
  notes: DUMMY_NOTE_lIST,
};

const NotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // use the PayloadAction type to declare the contents of `action.payload`
    addNote(state, action: PayloadAction<NOTE_INTERFACE>) {
      const { title, createdTimestamp, text } = action.payload;
      state.notes.unshift(createNote(title, text, createdTimestamp));
    },
    moveToTrash(
      state,
      action: PayloadAction<{ id: string; note: NOTE_INTERFACE }>,
    ) {
      const existedId = action.payload.id;
      state.notes = state.notes.filter((note) => note.id !== existedId);
    },
    editNote(
      state,
      action: PayloadAction<{
        title: string;
        text: string;
        id: string;
        updatedTimestamp: string;
      }>,
    ) {
      const { title, text, id, updatedTimestamp } = action.payload;

      const existedNoteIndex = state.notes.findIndex((note) => note.id === id);
      state.notes[existedNoteIndex].title = title;
      state.notes[existedNoteIndex].text = text;
      state.notes[existedNoteIndex].updatedTimestamp = updatedTimestamp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      restoreItem,
      (
        state,
        action: PayloadAction<{ id: string; note: TRASH_ITEM_INTERFACE }>,
      ) => {
        const restoredNote = action.payload.note.note;

        state.notes.unshift(restoredNote);
      },
    );
  },
});

// export const NotesActions = NotesSlice.actions;
export const { addNote, moveToTrash, editNote } = NotesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default NotesSlice.reducer;
