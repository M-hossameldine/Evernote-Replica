import { useState } from 'react';

import {
  useMoveNoteToTrashMutation,
  useRestoreNoteMutation,
  useDeleteNotePermanentlyMutation,
} from '~modules/notes/data/remote';

import ExcludeEventWrapper from '~components/ExcludeEventWrapper';
import NoteActionsDropdownItem from './NoteActionsDropdownItem';

import { IoIosMore } from 'react-icons/io';

export type NoteActionsDropdownProps = {
  noteId: string;
  isTrashItem: boolean;
  /** Runs before trash / restore / delete, e.g. to save pending edits. */
  onBeforeAction?: () => Promise<unknown>;
};

export const NoteActionsDropdown = ({
  noteId,
  isTrashItem,
  onBeforeAction,
}: NoteActionsDropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [moveNoteToTrash] = useMoveNoteToTrashMutation();
  const [restoreNote] = useRestoreNoteMutation();
  const [deleteNotePermanently] = useDeleteNotePermanentlyMutation();

  const toggleDropdownHandler = () => {
    setIsExpanded(prevState => !prevState);
  };

  const hideDropdownHandler = () => {
    setIsExpanded(false);
  };

  // The note stays open: the editor reads its new `status` from the cache.
  const moveToTrashHandler = async () => {
    // Save pending edits first: a trashed note can't be updated.
    await onBeforeAction?.();
    moveNoteToTrash({ extraParams: { noteId } });
  };

  const restoreNoteHandler = async () => {
    await onBeforeAction?.();
    restoreNote({ extraParams: { noteId } });
  };

  const deleteNotePermanentlyHandler = async () => {
    await onBeforeAction?.();
    deleteNotePermanently({ extraParams: { noteId } });
  };

  const actionsList = !isTrashItem ? (
    <NoteActionsDropdownItem
      text="Move To Trash"
      toggleDropdown={toggleDropdownHandler}
      onClick={moveToTrashHandler}
    />
  ) : (
    <>
      <NoteActionsDropdownItem
        text="Restore note"
        toggleDropdown={toggleDropdownHandler}
        onClick={restoreNoteHandler}
      />
      <NoteActionsDropdownItem
        text="Delete permanently"
        toggleDropdown={toggleDropdownHandler}
        onClick={deleteNotePermanentlyHandler}
      />
    </>
  );

  return (
    <ExcludeEventWrapper listenerHandler={hideDropdownHandler}>
      <div className="relative">
        <button
          className="m-0 p-0 text-neutral-500"
          onClick={toggleDropdownHandler}
        >
          <IoIosMore className="shrink-0 text-xl" />
        </button>

        <div
          className={`absolute right-0 top-[150%] z-10 whitespace-nowrap rounded bg-white p-2 text-sm shadow-even-2 ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
        >
          {actionsList}
        </div>
      </div>
    </ExcludeEventWrapper>
  );
};
