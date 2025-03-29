import { useMatch } from 'react-router-dom';

import { useAppSelector, selectActiveNotes } from '~store';
import { useGetActiveNotesQuery } from '~modules/notes/data/remote';

import NoteEditor from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import { EmptyStateIcon } from '~components/EmptyState';

import { IoIosPaper } from 'react-icons/io';
import { GiNotebook } from 'react-icons/gi';

import { NotesRouteVariants } from '~constants/routeVariants';

const NotesPage: React.FC = () => {
  const notes = useAppSelector(selectActiveNotes);
  const matchHomeNoteRoute = useMatch(NotesRouteVariants.homeNote.route);

  useGetActiveNotesQuery({});

  return (
    <div className="flex">
      {!matchHomeNoteRoute && (
        <NoteEditorSidebar
          notes={notes}
          header={{ title: 'Notes', icon: IoIosPaper }}
          emptyStateProps={{
            icon: <EmptyStateIcon Icon={GiNotebook} />,
            title: 'Create your first note',
            text: '',
            action: <NoteFallbackAction />,
          }}
        />
      )}

      {notes?.length > 0 && <NoteEditor />}
    </div>
  );
};

export default NotesPage;

const NoteFallbackAction: React.FC = () => {
  return <p>Click the + New Note button in the sidebar to get started</p>;
};
