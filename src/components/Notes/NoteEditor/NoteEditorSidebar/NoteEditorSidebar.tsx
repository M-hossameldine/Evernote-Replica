import { useAppSelector } from '../../../../hooks/redux-hooks';
import { selectNotes } from '../../../../store/notes-slice/notes-slice';

import NoteEditorSidebarHeader from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';
import NoteList from '../../NoteList/NoteList';
import Icons from '../../../../constants/Icons';

const { IoIosPaper } = Icons;

const NoteEditorSidebar: React.FC = (props) => {
  const notes = useAppSelector(selectNotes);

  return (
    <div className='flex flex-col bg-neutral-100 min-w-[18rem] h-screen'>
      {/* sidebar header*/}
      <NoteEditorSidebarHeader
        notes={notes}
        titleText='Notes'
        titleIcon={IoIosPaper}
        isTrashBin={false}
      />

      {/* Sidebar note list */}
      <NoteList notes={notes} />
    </div>
  );
};

export default NoteEditorSidebar;
