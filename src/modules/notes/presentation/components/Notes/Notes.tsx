import React from 'react';
import { useAppSelector } from '~hooks/redux-hooks';
import { selectNotes } from '~store';

import NoteList from '../NoteList/NoteList';
import NoteListingOptions from '../NoteListingOperations/NoteListingOptions';

import { IoIosPaper } from 'react-icons/io';

const Notes: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const notesNumber = notes.length;

  return (
    <div className="flex h-screen min-w-[18rem] flex-col bg-neutral-100">
      {/* Notes bar header */}
      <div className="border-b-[1px] border-b-neutral-300 p-4 pl-5 pt-5 shadow-sm">
        <h2 className="flex items-center gap-1 pb-3 text-neutral-700">
          <IoIosPaper size="22" className="shrink-0" />
          <span className="text-xl">Notes</span>
        </h2>
        <div className="flex items-center justify-between text-neutral-500">
          <p className="text-sm">{notesNumber} notes</p>
          <NoteListingOptions />
        </div>
      </div>

      {/* Notes List */}
      <NoteList notes={notes} />
    </div>
  );
};

export default Notes;
