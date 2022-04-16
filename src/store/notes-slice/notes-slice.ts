import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import NoteModel from '../../models/NoteModel';
import { RootState } from '../index';

const DUMMY_NOTE_lIST: NoteModel[] = [
  new NoteModel('1st note title', new Date(), 'This is my First Note'),
  new NoteModel('2st note title', new Date(), 'This is my Second Note'),
  new NoteModel('3rd note title', new Date(), 'This is my Third Note'),
  new NoteModel('4th note title', new Date(), 'This is my Forth Note'),
];

interface NotesState {
  notes: NoteModel[];
}

const initialState: NotesState = {
  notes: DUMMY_NOTE_lIST,
};

const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // use the PayloadAction type to declare the contents of `action.payload`
    addNote(state, action: PayloadAction<NoteModel>) {
      const { title, createdTimestamp, text } = action.payload;
      state.notes.push(new NoteModel(title, createdTimestamp, text));
    },
    removeNote(state, action: PayloadAction<string>) {
      const existedId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== existedId);
    },
    editNote(
      state,
      action: PayloadAction<{
        title: string;
        text: string;
        id: string;
        updatedTimestamp: Date;
      }>
    ) {
      const { title, text, id, updatedTimestamp } = action.payload;

      const existedNoteIndex = state.notes.findIndex((note) => note.id === id);

      state.notes[existedNoteIndex] = {
        ...state.notes[existedNoteIndex],
        title,
        text,
        updatedTimestamp,
      };

      // state.notes[existedNoteIndex].text = text;
      // state.notes[existedNoteIndex].title = title;
      // state.notes[existedNoteIndex].updatedTimestamp = updatedTimestamp;
    },
  },
});

// export const NotesActions = NotesSlice.actions;
export const { addNote, removeNote, editNote } = NotesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default NotesSlice.reducer;
