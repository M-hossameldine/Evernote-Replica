import { useNavigate } from 'react-router-dom';

import { useAddNoteMutation } from '~modules/notes/data/remote';
import { NotesRouteVariants } from '~constants';

export const useAddNote = () => {
  const navigate = useNavigate();
  const [addNoteMutation, { isLoading }] = useAddNoteMutation();

  const addNote = () => {
    addNoteMutation({
      // Timestamps are set by the server.
      payload: { title: '', text: '' },
      onSuccess: note => {
        navigate(NotesRouteVariants.activeNotes.pathname(note.id));
      },
    });
  };

  return {
    addNote,
    isLoading,
  };
};
