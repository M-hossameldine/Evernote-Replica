import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocationIndicator } from '~hooks/use-locationIndicator';

import {
  useAppSelector,
  MoveToTrashAction,
  deleteItemPermanentlyAction,
  restoreItemFromTrashAction,
  selectNotes,
  selectTrashNotes,
} from '~store';
import { findNoteById } from '~helpers';

import ExcludeEventWrapper from '~components/ExcludeEventWrapper';
import NoteActionsDropdownItem from './NoteActionsDropdownItem';

import { IoIosMore } from 'react-icons/io';

const NoteActionsDropdown: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();
  const params = useParams();

  const isInTrash = location.isInCurrentPath('trash');

  const selectedNote = findNoteById(
    isInTrash ? trashNotes : notes,
    params.noteId!
  );

  // sebmenu visiblity handlers
  const toggleDropdonwHandler = () => {
    setIsExpanded(prevState => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };

  const actionsContent = !isInTrash ? (
    <NoteActionsDropdownItem
      text="Move To Trash"
      asyncAction={MoveToTrashAction}
      asyncActionArgs={{ id: params.noteId, note: selectedNote! }}
      operation="delete"
    />
  ) : (
    <>
      <NoteActionsDropdownItem
        text="Delete permanently"
        asyncAction={deleteItemPermanentlyAction}
        asyncActionArgs={{ id: params.noteId }}
        operation="delete"
      />
      <NoteActionsDropdownItem
        text="Restore note"
        asyncAction={restoreItemFromTrashAction}
        asyncActionArgs={{ id: params.noteId, note: selectedNote! }}
        operation="delete"
      />
    </>
  );

  return (
    <ExcludeEventWrapper listenerHandler={hideDropdonwHandler}>
      <div className="relative">
        <button
          className="m-0 p-0 text-neutral-500"
          onClick={toggleDropdonwHandler}
        >
          <IoIosMore className="shrink-0 text-xl" />
        </button>

        <button
          className={`absolute right-0 top-[150%] z-10 whitespace-nowrap rounded bg-white text-sm shadow-even-2 ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
          onClick={hideDropdonwHandler}
        >
          {actionsContent}
        </button>
      </div>
    </ExcludeEventWrapper>
  );
};

export default NoteActionsDropdown;
