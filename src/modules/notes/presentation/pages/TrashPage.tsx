import { useAppSelector, selectTrashNotes } from '~store';

import NoteEditor from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';

import { FaTrash } from 'react-icons/fa';

const TrashPage: React.FC = () => {
  const trashNotes = useAppSelector(selectTrashNotes);

  return (
    <div className="flex">
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
