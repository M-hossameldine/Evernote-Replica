import { useAppSelector, useLocationIndicator } from '~hooks';

import { selectNotes } from '~store';

import { GiNotebook, IoIosPaper } from '~assets';

import NoteEditor from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';

const NotesPage: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const location = useLocationIndicator();

  return (
    <div className="flex">
      {/* hide sidebar list in the editor page */}
      {location.locationKey !== 'editor' && (
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
