import { useAppSelector, useUpdatedState } from '../../../hooks';
import { selectNotes, sendNewNoteData } from '../../../store/shared-store';
import { NOTESPAGE } from '../../../constants';

type Props = {
  children?: React.ReactNode;
  actionPayload?: {};
  className?: string;
};

const AddNoteWrapper: React.FC<Props> = (props) => {
  const { actionPayload, className } = props;
  const notes = useAppSelector(selectNotes);

  const notesUpdatedState = useUpdatedState({
    asyncAction: sendNewNoteData,
    route: NOTESPAGE,
    usedIndex: 0,
    watchedState: notes,
    operation: 'add',
  });

  const addNoteHandler = () => {
    notesUpdatedState.dispatchActionHandler({ ...actionPayload });
  };

  return (
    <button className={className ? className : ''} onClick={addNoteHandler}>
      {props.children}
    </button>
  );
};

export default AddNoteWrapper;
