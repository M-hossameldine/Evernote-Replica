import { useAppSelector } from '../hooks/redux-hooks';
import { selectTrashNotes } from '../store/trash-slice/trash-slice';

import NoteEditorSidebar from '../components/Notes/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';
import Icons from '../constants/Icons';

const { FaTrash } = Icons;

const TrashPage: React.FC = (props) => {
  const trashNotes = useAppSelector(selectTrashNotes);

  return (
    <div className='flex'>
      <NoteEditorSidebar
        notes={trashNotes}
        header={{ title: 'Trash', icon: FaTrash }}
      />
      {trashNotes.length > 0 && <NoteEditor />}
    </div>
  );
};

export default TrashPage;
