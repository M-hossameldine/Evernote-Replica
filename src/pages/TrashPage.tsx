import { useAppSelector } from '../hooks/redux-hooks';
import { selectTrashNotes } from '../store/trash-slice/trash-slice';

import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';
import { FaTrash } from '../assets/index';

const TrashPage: React.FC = (props) => {
  const trashNotes = useAppSelector(selectTrashNotes);

  return (
    <div className='flex'>
      <NoteEditorSidebar
        notes={trashNotes}
        header={{ title: 'Trash', icon: FaTrash }}
        fallbackData={{
          icon: FaTrash,
          title: 'Your Trash is empty',
          text: "When you have notes in the trash, click '...' to restore or delete them.",
        }}
      />
      {trashNotes.length > 0 && <NoteEditor />}
    </div>
  );
};

export default TrashPage;
