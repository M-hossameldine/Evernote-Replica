import Notes from '../components/Notes/Notes';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';

const NotesPage: React.FC = (props) => {
  return (
    <div className='flex'>
      <Notes />
      <NoteEditor />
    </div>
  );
};

export default NotesPage;
