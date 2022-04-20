import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';

const TrashPage: React.FC = (props) => {
  return (
    <div className='flex'>
      <NoteEditorSidebar />
      <NoteEditor />
    </div>
  );
};

export default TrashPage;
