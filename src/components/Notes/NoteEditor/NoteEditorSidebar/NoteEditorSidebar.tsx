import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../../interfaces/trash-interface';
import { HEADER_INTERFACE } from '../../../../interfaces/header-interface';
import NoteEditorSidebarHeader from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';
import NoteList from '../../NoteList/NoteList';
import FallbackMsg from '../../../UI/FallbackMsg/FallbackMsg';
import Icons from '../../../../constants/Icons';

const { FaTrash } = Icons;

const NoteEditorSidebar: React.FC<{
  notes: NOTE_INTERFACE[] | TRASH_ITEM_INTERFACE[];
  header: HEADER_INTERFACE;
}> = (props) => {
  const { notes, header } = props;

  return (
    <div className='flex flex-col bg-neutral-100 min-w-[18rem] max-w-[24rem] h-screen'>
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && (
        <FallbackMsg
          fallbackData={{
            icon: FaTrash,
            title: 'Your Trash is empty',
            text: "When you have notes in the trash, click '...' to restore or delete them.",
          }}
        />
      )}
    </div>
  );
};

export default NoteEditorSidebar;
