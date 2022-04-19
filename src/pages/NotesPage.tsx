import Notes from '../components/Notes/Notes';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';
import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';

const NotesPage: React.FC = (props) => {
  return (
    <div className='flex'>
      <NoteEditorSidebar />
      <NoteEditor />
    </div>
  );
};

export default NotesPage;
