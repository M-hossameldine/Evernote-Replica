import { useState } from 'react';
import { useMatch } from 'react-router-dom';

import { useAppSelector, selectActiveNotes } from '~store';

import { NoteEditor } from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import type { TemporaryNoteStatus } from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import { EmptyStateIcon } from '~components/EmptyState';

import { IoIosPaper } from 'react-icons/io';
import { GiNotebook } from 'react-icons/gi';

import { NotesRouteVariants } from '~constants/routeVariants';

import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

const NotesPage: React.FC = () => {
  const notes = useAppSelector(selectActiveNotes);
  const matchHomeNoteRoute = useMatch(NotesRouteVariants.homeNote.route);

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
      {!matchHomeNoteRoute && (
        <NoteEditorSidebar
          notes={notes}
          onSelectNote={selectNoteHandler}
          header={{ title: 'Notes', icon: IoIosPaper }}
          emptyStateProps={{
            icon: <EmptyStateIcon Icon={GiNotebook} />,
            title: 'Create your first note',
            text: '',
            action: <NoteFallbackAction />,
          }}
        />
      )}

      {notes?.length > 0 && (
        <NoteEditor
          temporaryNoteStatus={temporaryNoteStatus}
          setTemporaryNoteStatus={setTemporaryNoteStatus}
        />
      )}
    </div>
  );
};

export default NotesPage;

const NoteFallbackAction: React.FC = () => {
  return <p>Click the + New Note button in the sidebar to get started</p>;
};
