import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useDeleteNoteMutation,
  useDeleteTrashNoteMutation,
} from '~modules/notes/data/remote';

import ExcludeEventWrapper from '~components/ExcludeEventWrapper';
import NoteActionsDropdownItem from './NoteActionsDropdownItem';

import { IoIosMore } from 'react-icons/io';

export type NoteActionsDropdownProps = {
  isTrashItem: boolean;
  onDeleteNote: (noteId: string) => void;
  onRestoreNote: (noteId: string) => void;
};

export const NoteActionsDropdown = ({
  isTrashItem,
  onDeleteNote,
  onRestoreNote,
}: NoteActionsDropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const params = useParams<{ noteId: string }>() as { noteId: string };
  const [deleteNote] = useDeleteNoteMutation();
  const [deleteTrashNote] = useDeleteTrashNoteMutation();
  const toggleDropdownHandler = () => {
    setIsExpanded(prevState => !prevState);
  };

  const hideDropdownHandler = () => {
    setIsExpanded(false);
  };

  const moveToTrashHandler = (noteToDeleteId: string) => {
    deleteNote({
      extraParams: {
        noteId: noteToDeleteId,
      },
      onSuccess: () => {
        onDeleteNote(noteToDeleteId);
      },
    });
  };

  const restoreNoteHandler = (noteToRestoreId: string) => {
    onRestoreNote(noteToRestoreId);
    // TODO: trigger restore note mutation
  };

  const deleteNotePermanentlyHandler = (noteToDeleteId: string) => {
    deleteTrashNote({
      extraParams: { noteId: noteToDeleteId },
    });
  };

  const actionsContent = !isTrashItem ? (
    <NoteActionsDropdownItem
      text="Move To Trash"
      toggleDropdown={toggleDropdownHandler}
      onClick={moveToTrashHandler.bind(null, params.noteId)}
    />
  ) : (
    <>
      <NoteActionsDropdownItem
        text="Delete permanently"
        toggleDropdown={toggleDropdownHandler}
        onClick={deleteNotePermanentlyHandler.bind(null, params.noteId)}
      />
      <NoteActionsDropdownItem
        text="Restore note"
        toggleDropdown={toggleDropdownHandler}
        onClick={restoreNoteHandler.bind(null, params.noteId)}
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

        <button
          className={`absolute right-0 top-[150%] z-10 whitespace-nowrap rounded bg-white text-sm shadow-even-2 ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
          onClick={hideDropdownHandler}
        >
          {actionsContent}
        </button>
      </div>
    </ExcludeEventWrapper>
  );
};
