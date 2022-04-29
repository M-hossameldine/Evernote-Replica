import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocationIndicator } from '../../../../hooks/use-locationIndicator';

import { useAppSelector } from '../../../../hooks/redux-hooks';
import { selectNoteEditor } from '../../../../store/noteEditor-slice/noteEditor-slice';
import { selectNotes } from '../../../../store/notes-slice/notes-slice';
import { selectTrashNotes } from '../../../../store/trash-slice/trash-slice';
import { MoveToTrashAction } from '../../../../store/notes-slice/notes-actions';
import {
  deleteItemPermanentlyAction,
  restoreItemFromTrashAction,
} from '../../../../store/trash-slice/trash-actions';
import ExecludeEventWrapper from '../../../UI/ExecludeEventWrapper/ExecludeEventWrapper';
import NoteActionsDropdownItem from './NoteActionsDropdownItem';
import { findNoteById } from '../../../../utils/functions';
import Icons from '../../../../constants/Icons';

const { IoIosMore } = Icons;

const NoteActionsDropdown: React.FC = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();
  const params = useParams();

  const isInTrash = location.locationKey === 'trash';

  const selectedNote = findNoteById(
    isInTrash ? trashNotes : notes,
    params.noteId!
  );

  // sebmenu visiblity handlers
  const toggleDropdonwHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };

  const actionsContent = !isInTrash ? (
    <>
      <NoteActionsDropdownItem
        text='Move To Trash'
        asyncAction={MoveToTrashAction}
        asyncActionArgs={{ id: params.noteId, note: selectedNote! }}
        operation='delete'
      />
    </>
  ) : (
    <>
      <NoteActionsDropdownItem
        text='Delete permanently'
        asyncAction={deleteItemPermanentlyAction}
        asyncActionArgs={{ id: params.noteId }}
        operation='delete'
      />
      <NoteActionsDropdownItem
        text='Restore note'
        asyncAction={restoreItemFromTrashAction}
        asyncActionArgs={{ id: params.noteId, note: selectedNote! }}
        operation='delete'
      />
    </>
  );

  return (
    <ExecludeEventWrapper listenerHandler={hideDropdonwHandler}>
      <div className='relative'>
        <button
          className='text-neutral-500 m-0 p-0'
          onClick={toggleDropdonwHandler}
        >
          <IoIosMore className='text-xl shrink-0' />
        </button>

        <div
          className={`absolute right-0 top-[150%] z-10 bg-white whitespace-nowrap shadow-even-2 rounded text-sm ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
          onClick={hideDropdonwHandler}
        >
          {actionsContent}
        </div>
      </div>
    </ExecludeEventWrapper>
  );
};

export default NoteActionsDropdown;
