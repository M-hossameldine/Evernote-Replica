import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

import { selectNotes } from '../store/notes-slice/notes-slice';
import { addNote } from '../store/notes-slice/notes-slice';
import { createNote } from '../interfaces/note-interface';
import { NOTESPAGE } from '../constants/routes';

export const useAddNewNote = () => {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addToStore = (noteData?: { title?: string; text?: string }) => {
    const firstNoteId = notes[0].id;
    const newTitle = noteData && noteData.title ? noteData.title : '';
    const newText = noteData && noteData.text ? noteData.text : '';
    const timestamp = new Date().toISOString();

    dispatch(addNote(createNote(newTitle, newText, timestamp)));

    navigate(`${NOTESPAGE}/${firstNoteId}`);
  };

  return { addToStore };
};
