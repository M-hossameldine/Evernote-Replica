import { useNavigate } from 'react-router-dom';
import { useAddNoteMutation } from '~modules/notes/data/remote';
import { useAppSelector, selectUser } from '~store';
import { NotesRouteVariants } from '~constants';

export const useAddNote = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [addNoteMutation, { isLoading }] = useAddNoteMutation();

  const addNote = () => {
    if (!user) return;

    addNoteMutation({
      payload: {
        title: '',
        text: '',
        createdTimestamp: new Date().toISOString(),
        updatedTimestamp: new Date().toISOString(),
      },
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
