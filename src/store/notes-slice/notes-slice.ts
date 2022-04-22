import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { NOTE_INTERFACE, createNote } from '../../interfaces/note-interface';
import { RootState } from '../index';

const DUMMY_NOTE_lIST: NOTE_INTERFACE[] = [
  {
    id: '0',
    title: '1st Note Title',
    text: '1st Note text body',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: '',
  },
  {
    id: '1',
    title: '2nd Note Title',
    text: '2nd Note text body',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: '',
  },
  {
    id: '2',
    title: '3rd Note Title',
    text: '3rd Note text body',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: '',
  },
  {
    id: '3',
    title: '4th Note Title',
    text: '4th Note text body',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: '',
  },
];

interface NotesState {
  notes: NOTE_INTERFACE[];
}

const initialState: NotesState = {
  notes: DUMMY_NOTE_lIST,
};

const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // use the PayloadAction type to declare the contents of `action.payload`
    addNote(state, action: PayloadAction<NOTE_INTERFACE>) {
      const { title, createdTimestamp, text } = action.payload;
      state.notes.unshift(createNote(title, text, createdTimestamp));
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
        updatedTimestamp: string;
      }>
    ) {
      const { title, text, id, updatedTimestamp } = action.payload;
      console.log('id note-slice', id);
      const existedNoteIndex = state.notes.findIndex((note) => note.id === id);
      state.notes[existedNoteIndex].title = title;
      state.notes[existedNoteIndex].text = text;
      state.notes[existedNoteIndex].updatedTimestamp = updatedTimestamp;
      // state.notes[existedNoteIndex] = {
      //   ...state.notes[existedNoteIndex],
      //   title,
      //   text,
      //   updatedTimestamp,
      // };
    },
  },
});

// export const NotesActions = NotesSlice.actions;
export const { addNote, removeNote, editNote } = NotesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default NotesSlice.reducer;
