import { Dispatch } from 'redux';
import { useParams } from 'react-router-dom';
import { useUpdatedState } from '../../../../hooks/use-updatedState';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import { useLocationIndicator } from '../../../../hooks/use-locationIndicator';

import { selectNotes } from '../../../../store/notes-slice/notes-slice';
import { selectTrashNotes } from '../../../../store/trash-slice/trash-slice';
import { selectNoteEditor } from '../../../../store/noteEditor-slice/noteEditor-slice';

import { NOTESPAGE, TRASHPAGE } from '../../../../constants/routes';
import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../../interfaces/trash-interface';
import { findNoteById } from '../../../../utils/functions';

const NoteActionsDropdownItem: React.FC<{
  text: string;
  asyncAction: (payload?: any) => (dispatch: Dispatch) => Promise<void>;
  asyncActionArgs: {};
  operation: 'add' | 'delete' | 'update';
}> = (props) => {
  const { text, asyncAction, asyncActionArgs, operation } = props;

  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();
  const params = useParams();

  const isInTrash = location.locationKey === 'trash';

  const notesList: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[] = isInTrash
    ? trashNotes
    : notes;

  const updatedState = useUpdatedState({
    asyncAction,
    watchedState: isInTrash ? trashNotes : notes,
    route: isInTrash ? TRASHPAGE : NOTESPAGE,
    usedIndex: editor.activeNoteIndex,
    operation,
  });

  const itemActionHandler = () => {
    console.log('dropdown action', 'clicked');
    console.log('dropdown action', { ...asyncActionArgs });
    updatedState.dispatchActionHandler({ ...asyncActionArgs });
  };

  return (
    <div className='flex justify-between gap-4 py-2'>
      <button
        className='flex gap-4 text-neutral-700 hover:bg-neutral-100 px-4 py-1'
        onClick={itemActionHandler}
      >
        {text}
        {/* <span className='text-neutral-500'> Delete </span> */}
      </button>
    </div>
  );
};

export default NoteActionsDropdownItem;
