import { Dispatch } from 'redux';
import { addNote } from './notes-slice';
import { createNote } from '../../interfaces/note-interface';

export const sendNewNoteData = (noteData?: {
  title?: string;
  text?: string;
}) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const newTitle = noteData && noteData.title ? noteData.title : '';
      const newText = noteData && noteData.text ? noteData.text : '';
      const timestamp = new Date().toISOString();

      dispatch(addNote(createNote(newTitle, newText, timestamp)));
    };

    try {
      sendRequest();
    } catch (error) {}
  };
};
