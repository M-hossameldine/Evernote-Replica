import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectNotes } from '../../../store/notes-slice/notes-slice';
import { sendNewNoteData } from '../../../store/notes-slice/notes-actions';
import { NOTESPAGE } from '../../../constants/routes';
import { useUpdatedState } from '../../../hooks/use-updatedState';
const AddNoteWrapper: React.FC<{
  actionPayload?: {};
  className?: string;
}> = (props) => {
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
