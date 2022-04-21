import { useAppSelector } from '../hooks/redux-hooks';
import { selectNotes } from '../store/notes-slice/notes-slice';

import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';
import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import Icons from '../constants/Icons';

const { IoIosPaper } = Icons;

const NotesPage: React.FC = (props) => {
  const notes = useAppSelector(selectNotes);

  return (
    <div className='flex'>
      <NoteEditorSidebar
        notes={notes}
        header={{ title: 'Notes', icon: IoIosPaper }}
      />
      <NoteEditor />
    </div>
  );
};

export default NotesPage;
