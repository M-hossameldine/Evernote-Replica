import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { addNote } from './notes-slice';
import { createNote } from '../../interfaces/note-interface';
import { NOTE_INTERFACE } from '../../interfaces/note-interface';
import { NOTESPAGE } from '../../constants/routes';
import { AppDispatch, RootState } from '../store';
import { moveToTrash } from './notes-slice';

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
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const newTitle = payload && payload.title ? payload.title : '';
    const newText = payload && payload.text ? payload.text : '';
    const timestamp = new Date().toISOString();

    const note = createNote(newTitle, newText, timestamp);

    console.log('add note state', getState().notes.notes);
    // Error handling and api requests will be added
    const sendRequest = async () => {
      const response = await axios({
        method: 'POST',
        url: `https://evernote-replica-react-default-rtdb.firebaseio.com/users/${userId}/notes/${note.id}.json`,
        data: JSON.stringify({
          note,
        }),
      });
    };

    try {
      await sendRequest();

      dispatch(addNote(note));
    } catch (error) {}
  };
};

export const MoveToTrashAction = (payload?: any) => {
  return async (dispatch: Dispatch) => {
    console.log('payload dropdown', payload);
    const sendRequest = async () => {};
    try {
      await sendRequest();

      dispatch(moveToTrash({ id: payload.id, note: payload.note }));
    } catch (error) {}

    // Error handling and api requests will be added
  };
};
