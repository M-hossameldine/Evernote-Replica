import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../../interfaces/trash-interface';
import { HEADER_INTERFACE } from '../../../../interfaces/header-interface';
import { FALLBACK_DATA_INTERFACE } from '../../../../interfaces/fallbackData-interface';
import NoteEditorSidebarHeader from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';
import NoteList from '../../NoteList/NoteList';
import FallbackMsg from '../../../UI/FallbackMsg/FallbackMsg';

const NoteEditorSidebar: React.FC<{
  notes: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[];
  header: HEADER_INTERFACE;
  fallbackData: FALLBACK_DATA_INTERFACE;
}> = (props) => {
  const { notes, header, fallbackData } = props;

  return (
    <div className='flex flex-col bg-neutral-100 min-w-[18rem] max-w-[24rem] h-screen'>
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && <FallbackMsg fallbackData={fallbackData} />}
    </div>
  );
};

export default NoteEditorSidebar;
