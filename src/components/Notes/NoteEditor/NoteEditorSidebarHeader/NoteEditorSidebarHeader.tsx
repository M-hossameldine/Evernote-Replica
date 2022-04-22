import { useLocationIndicator } from '../../../../hooks/use-locationIndicator';

import NoteListingOptions from '../../NoteListingOperations/NoteListingOptions';
import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../../interfaces/trash-interface';
import { HEADER_INTERFACE } from '../../../../interfaces/header-interface';

const NoteEditorSidebarHeader: React.FC<{
  notes: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[];
  headerData: HEADER_INTERFACE;
}> = (props) => {
  const location = useLocationIndicator();

  const { notes, headerData } = props;
  const notesNumber = notes.length;

  return (
    <div className='  border-b-neutral-300 shadow-sm p-4 pl-5 pt-5 border-b-[1px]'>
      <div className='flex items-center gap-1 text-neutral-700 pb-3 '>
        <headerData.icon size='18' className='shrink-0' />
        <h2 className='text-xl'>{headerData.title}</h2>
        {location.locationKey === 'trash' && (
          <button className='ml-auto text-sm text-white bg-neutral-300 px-3 py-1 rounded'>
            Empty Trash
          </button>
        )}
      </div>

      <div className='flex justify-between items-center text-neutral-500 '>
        <p className='text-sm'>{notesNumber} notes</p>
        <NoteListingOptions />
      </div>
    </div>
  );
};

export default NoteEditorSidebarHeader;
