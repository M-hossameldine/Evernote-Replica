import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../../interfaces/trash-interface';
import { HEADER_INTERFACE } from '../../../../interfaces/header-interface';
import NoteEditorSidebarHeader from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';
import NoteList from '../../NoteList/NoteList';

const NoteEditorSidebar: React.FC<{
  notes: NOTE_INTERFACE[] | TRASH_ITEM_INTERFACE[];
  header: HEADER_INTERFACE;
}> = (props) => {
  const { notes, header } = props;

  return (
    <div className='flex flex-col bg-neutral-100 min-w-[18rem] h-screen'>
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      <NoteList notes={notes} />
    </div>
  );
};

export default NoteEditorSidebar;
