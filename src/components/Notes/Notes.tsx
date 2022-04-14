import { useState } from 'react';

import Icons from '../../constants/Icons';
import NoteModel from '../../models/NoteModel';
import NoteListingOptions from './NoteListingOperations/NoteListingOptions';
import NoteList from './NoteList/NoteList';

const { IoIosPaper } = Icons;

const DUMMY_NOTE_lIST: NoteModel[] = [
  new NoteModel('1st note title', new Date(), 'This is my First Note'),
  new NoteModel('2st note title', new Date(), 'This is my Second Note'),
  new NoteModel('2st note title', new Date(), 'This is my Third Note'),
];

const Notes: React.FC = (props) => {
  const [notes, setNotes] = useState(DUMMY_NOTE_lIST);

  const notesNumber = notes.length;

  return (
    <div className='flex flex-col bg-neutral-100 min-w-[18rem] h-screen'>
      {/* Notes bar header */}
      <div className='  border-b-neutral-300 shadow-sm p-4 pl-5 pt-5 border-b-[1px]'>
        <h2 className='flex items-center gap-1 text-neutral-700 pb-3 '>
          <IoIosPaper size='22' className='shrink-0' />
          <span className='text-xl'>Notes</span>
        </h2>
        <div className='flex justify-between items-center text-neutral-500 '>
          <p className='text-sm'>{notesNumber} notes</p>
          <NoteListingOptions />
        </div>
      </div>
      {/* Notes List */}
      <NoteList notes={DUMMY_NOTE_lIST} />
    </div>
  );
};

export default Notes;
