import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~store';

import type {
  NotesState,
  SaveActiveNotesActionPayload,
  SaveTrashNotesActionPayload,
} from './notesSlice.interfaces';
import { createNote } from './notesSlice.helpers';
import { restoreItem } from './trash-slice';

const initialState: NotesState = {
  activeNotes: [],
  activeNoteInEditor: null,
  trashNotes: [],
  trashNoteInEditor: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // use the PayloadAction type to declare the contents of `action.payload`
    saveActiveNotes(
      state,
      action: PayloadAction<SaveActiveNotesActionPayload>
    ) {
      const activeNotes = action.payload;
      state.activeNotes = activeNotes;
    },
    saveTrashNotes(state, action: PayloadAction<SaveTrashNotesActionPayload>) {
      const trashNotes = action.payload;
      state.trashNotes = trashNotes;
    },
    saveActiveNoteInEditor(state, action: PayloadAction<Note>) {
      state.activeNoteInEditor = action.payload;
    },
    saveTrashNoteInEditor(state, action: PayloadAction<TrashNote>) {
      state.trashNoteInEditor = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      const { title, createdTimestamp, text } = action.payload;
      state.activeNotes?.unshift(createNote(title, text, createdTimestamp));
    },
    moveToTrash(state, action: PayloadAction<{ id: string; note: Note }>) {
      const existedId = action.payload.id;
      state.activeNotes =
        state?.activeNotes?.filter?.(note => note.id !== existedId) || [];
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

      const existedNoteIndex = state.activeNotes?.findIndex(
        note => note.id === id
      );
      state.activeNotes[existedNoteIndex].title = title;
      state.activeNotes[existedNoteIndex].text = text;
      state.activeNotes[existedNoteIndex].updatedTimestamp = updatedTimestamp;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      restoreItem,
      (state, action: PayloadAction<{ id: string; note: TrashNote }>) => {
        const restoredNote = action.payload.note.note;

        state.activeNotes.unshift(restoredNote);
      }
    );
  },
});

// export const NotesActions = notesSlice.actions;
export const {
  saveActiveNotes,
  saveTrashNotes,
  saveActiveNoteInEditor,
  saveTrashNoteInEditor,
  addNote,
  moveToTrash,
  editNote,
} = notesSlice.actions;

export const selectActiveNotes = (state: RootState) => state.notes.activeNotes;
export const selectTrashNotes = (state: RootState) => state.notes.trashNotes;
export const selectActiveNoteInEditor = (state: RootState) =>
  state.notes.activeNoteInEditor;
export const selectTrashNoteInEditor = (state: RootState) =>
  state.notes.trashNoteInEditor;

export default notesSlice.reducer;
