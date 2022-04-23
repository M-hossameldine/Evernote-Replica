import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { addNote } from './notes-slice';
import { createNote } from '../../interfaces/note-interface';
import { NOTE_INTERFACE } from '../../interfaces/note-interface';
import { NOTESPAGE } from '../../constants/routes';
import { AppDispatch, RootState } from '../index';

// export const sendNewNoteData2 = createAsyncThunk(
//   'notes/sendNewNoteStatus',
//   async (noteData, thunkApi) => {
//     const state = thunkApi.getState();
//     const dispatch = thunkApi.dispatch;
//   }
// );

export const sendNewNoteData = (payload?: {
  title?: string;
  text?: string;
}) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const newTitle = payload && payload.title ? payload.title : '';
      const newText = payload && payload.text ? payload.text : '';
      const timestamp = new Date().toISOString();

      const note = createNote(newTitle, newText, timestamp);
      dispatch(addNote(note));
    };

    try {
      await sendRequest();
    } catch (error) {}
  };
};
