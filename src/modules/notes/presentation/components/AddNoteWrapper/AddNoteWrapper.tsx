import { useUpdatedState } from '~hooks';
import { useNavigate } from 'react-router-dom';

import { useAddNoteMutation } from '~modules/notes/data/remote';
import { useAppSelector, selectUser, sendNewNoteData } from '~store';
import { selectActiveNotes } from '~modules/notes/data/local';

import { NotesRouteVariants, NoteStatus } from '~constants';

type Props = {
  children?: React.ReactNode;
  actionPayload?: object;
  className?: string;
};

export const AddNoteWrapper = (props: Props): React.ReactElement => {
  const { actionPayload, className } = props;
  const navigate = useNavigate();
  const notes = useAppSelector(selectActiveNotes);
  const user = useAppSelector(selectUser);
  const [addNoteMutation] = useAddNoteMutation();

  const notesUpdatedState = useUpdatedState({
    asyncAction: sendNewNoteData,
    status: NoteStatus.ACTIVE,
    usedIndex: 0,
    watchedState: notes,
    operation: 'add',
  });

  const addNoteHandler = () => {
    notesUpdatedState.dispatchActionHandler({ ...actionPayload });

    if (!user) return;

    addNoteMutation({
      payload: {
        title: '',
        text: '',
        createdTimestamp: new Date().toISOString(),
        updatedTimestamp: new Date().toISOString(),
      },
      onSuccess: note => {
        navigate(NotesRouteVariants.notes.pathname(note.id));
      },
    });
  };

  return (
    <button className={className ? className : ''} onClick={addNoteHandler}>
      {props.children}
    </button>
  );
};

export default AddNoteWrapper;
