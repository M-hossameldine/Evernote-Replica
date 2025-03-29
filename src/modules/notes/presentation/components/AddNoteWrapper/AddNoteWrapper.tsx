import { useNavigate } from 'react-router-dom';

import { useAddNoteMutation } from '~modules/notes/data/remote';
import { useAppSelector, selectUser } from '~store';

import { AddNoteScreenLoading } from './AddNoteScreenLoading';

import { NotesRouteVariants } from '~constants';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const AddNoteWrapper = (props: Props): React.ReactElement => {
  const { className } = props;
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [addNoteMutation, { isLoading }] = useAddNoteMutation();

  const addNoteHandler = () => {
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

  return (
    <>
      <button className={className ? className : ''} onClick={addNoteHandler}>
        {props.children}
      </button>

      {isLoading && <AddNoteScreenLoading />}
    </>
  );
};

export default AddNoteWrapper;
