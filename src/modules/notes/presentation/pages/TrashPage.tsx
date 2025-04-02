import { useState } from 'react';
import { useAppSelector } from '~store';
import { selectTrashNotes } from '~modules/notes/data/local';

import { NoteEditor } from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import { EmptyStateIcon } from '~components/EmptyState';
import type { TemporaryNoteStatus } from '~modules/notes/presentation/components/NoteEditor/NoteEditor';

import { FaTrash } from 'react-icons/fa';

import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

const TrashPage: React.FC = () => {
  const trashNotes = useAppSelector(selectTrashNotes);

  const [temporaryNoteStatus, setTemporaryNoteStatus] =
    useState<TemporaryNoteStatus>({
      tempNote: null,
      isRecentlyDeleted: false,
      isRecentlyRestoredFromTrash: false,
      updatedNote: null,
    });

  const selectNoteHandler = (note: Note | TrashNote) => {
    setTemporaryNoteStatus({
      tempNote: note,
      isRecentlyDeleted: false,
      isRecentlyRestoredFromTrash: false,
      updatedNote: null,
    });
  };

  return (
    <div className="flex">
      <NoteEditorSidebar
        notes={trashNotes}
        onSelectNote={selectNoteHandler}
        header={{ title: 'Trash', icon: FaTrash }}
        emptyStateProps={{
          icon: <EmptyStateIcon Icon={FaTrash} />,
          title: 'Your Trash is empty',
          text: "When you have notes in the trash, click '...' to restore or delete them.",
        }}
      />
      {trashNotes?.length > 0 && (
        <NoteEditor
          temporaryNoteStatus={temporaryNoteStatus}
          setTemporaryNoteStatus={setTemporaryNoteStatus}
        />
      )}
    </div>
  );
};

export default TrashPage;
