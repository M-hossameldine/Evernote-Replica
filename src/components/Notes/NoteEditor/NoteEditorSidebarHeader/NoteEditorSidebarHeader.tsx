import { IconType } from 'react-icons';

import NoteListingOptions from '../../NoteListingOperations/NoteListingOptions';
import { NOTE_INTERFACE } from '../../../../interfaces/note-interface';
import Icons from '../../../../constants/Icons';

const { IoIosPaper } = Icons;

const NoteEditorSidebarHeader: React.FC<{
  notes: NOTE_INTERFACE[];
  titleText: string;
  titleIcon: IconType;
  isTrashBin: boolean; // true: component used in trash page, false: used in notes page
}> = (props) => {
  const { notes, titleText, titleIcon, isTrashBin } = props;
  const notesNumber = notes.length;

  return (
    <div className='  border-b-neutral-300 shadow-sm p-4 pl-5 pt-5 border-b-[1px]'>
      <div className='flex items-center gap-1 text-neutral-700 pb-3 '>
        <IoIosPaper size='22' className='shrink-0' />
        <h2 className='text-xl'>{titleText}</h2>
        {isTrashBin && (
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
