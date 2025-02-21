import { AppDispatch } from 'store';

import { createNote } from './notesSlice.helpers';
import { addNote, moveToTrash } from './notesSlice';

export const sendNewNoteData = (payload?: {
  title?: string;
  text?: string;
}) => {
  return async (dispatch: AppDispatch) => {
    const newTitle = payload && payload.title ? payload.title : '';
    const newText = payload && payload.text ? payload.text : '';
    const timestamp = new Date().toISOString();

    const note = createNote(newTitle, newText, timestamp);

    const sendRequest = async () => {
      //Todo: api request will be added
    };

    try {
      await sendRequest();

      dispatch(addNote(note));
    } catch (error) {
      //Todo: Error handling
    }
  };
};

export const MoveToTrashAction = (payload?: any) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      //Todo: api request will be added
    };
    try {
      await sendRequest();

      dispatch(moveToTrash({ id: payload.id, note: payload.note }));
    } catch (error) {
      //Todo: Error handling
    }
  };
};
