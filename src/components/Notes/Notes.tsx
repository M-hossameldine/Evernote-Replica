import React from "react";
import { useAppSelector } from "hooks/redux-hooks";
import { selectNotes } from "store";

import { IoIosPaper } from "assets";
import NoteListingOptions from "./NoteListingOperations/NoteListingOptions";
import NoteList from "./NoteList/NoteList";

const Notes: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const notesNumber = notes.length;

  return (
    <div className="flex flex-col bg-neutral-100 min-w-[18rem] h-screen">
      {/* Notes bar header */}
      <div className="  border-b-neutral-300 shadow-sm p-4 pl-5 pt-5 border-b-[1px]">
        <h2 className="flex items-center gap-1 text-neutral-700 pb-3 ">
          <IoIosPaper size="22" className="shrink-0" />
          <span className="text-xl">Notes</span>
        </h2>
        <div className="flex justify-between items-center text-neutral-500 ">
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
