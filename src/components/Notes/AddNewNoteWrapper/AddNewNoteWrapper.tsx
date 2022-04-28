import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectNotes } from '../../../store/notes-slice/notes-slice';
import { sendNewNoteData } from '../../../store/notes-slice/notes-actions';
import { NOTESPAGE } from '../../../constants/routes';
import { useUpdatedState } from '../../../hooks/use-updatedState';
const AddNewNote: React.FC<{ payload?: {}; className?: string }> = (props) => {
  const { payload, className } = props;
  const notes = useAppSelector(selectNotes);
  const notesUpdatedState = useUpdatedState({
    asyncAction: sendNewNoteData,
    route: NOTESPAGE,
    usedIndex: 0,
    watchedState: notes,
    operation: 'add',
  });

  const addNoteHandler = () => {
    notesUpdatedState.dispatchActionHandler({ ...payload });
  };
  return (
    <div className={className ? className : ''} onClick={addNoteHandler}>
      {props.children}
    </div>
  );
};

export default AddNewNote;
