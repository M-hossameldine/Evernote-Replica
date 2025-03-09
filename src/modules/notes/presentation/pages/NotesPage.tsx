import { useLocationIndicator } from '~hooks';
import { useAppSelector, selectNotes } from '~store';

import NoteEditor from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';

import { IoIosPaper } from 'react-icons/io';
import { GiNotebook } from 'react-icons/gi';

const NotesPage: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const location = useLocationIndicator();

  return (
    <div className="flex">
      {/* hide sidebar list in the homepage-note page */}
      {location.locationKey !== 'homepage-note' && (
        <NoteEditorSidebar
          notes={notes}
          header={{ title: 'Notes', icon: IoIosPaper }}
          fallbackData={{
            icon: GiNotebook,
            title: 'Create your first note',
            text: '',
            action: noteFallbackAction,
          }}
        />
      )}
      {notes.length > 0 && <NoteEditor />}
    </div>
  );
};

export default NotesPage;

const noteFallbackAction: React.FC = () => {
  return <p>Click the + New Note button in the sidebar to get started</p>;
};
