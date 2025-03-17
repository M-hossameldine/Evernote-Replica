import { useAppSelector } from '~store';
import { selectTrashNotes } from '~modules/notes/data/local';

import NoteEditor from '~modules/notes/presentation/components/NoteEditor/NoteEditor';
import NoteEditorSidebar from '~modules/notes/presentation/components/NoteEditor/NoteEditorSidebar/NoteEditorSidebar';
import { EmptyStateIcon } from '~components/EmptyState';

import { FaTrash } from 'react-icons/fa';

const TrashPage: React.FC = () => {
  const trashNotes = useAppSelector(selectTrashNotes);

  return (
    <div className="flex">
      <NoteEditorSidebar
        notes={trashNotes}
        header={{ title: 'Trash', icon: FaTrash }}
        emptyStateProps={{
          icon: <EmptyStateIcon Icon={FaTrash} />,
          title: 'Your Trash is empty',
          text: "When you have notes in the trash, click '...' to restore or delete them.",
        }}
      />
      {trashNotes?.length > 0 && <NoteEditor />}
    </div>
  );
};

export default TrashPage;
