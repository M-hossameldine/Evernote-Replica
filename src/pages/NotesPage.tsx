import { useAppSelector } from '../hooks/redux-hooks';
import { selectNotes } from '../store/notes-slice/notes-slice';
import { useLocationIndicator } from '../hooks/use-locationIndicator';

import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';
import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import { IoIosPaper, GiNotebook } from '../assets/index';

const NotesPage: React.FC = (props) => {
  const notes = useAppSelector(selectNotes);
  const location = useLocationIndicator();

  return (
    <div className='flex'>
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

const noteFallbackAction: React.FC = (props) => {
  return <p>Click the + New Note button in the sidebar to get started</p>;
};
