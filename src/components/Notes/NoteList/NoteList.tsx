import { NOTE_INTERFACE, TRASH_ITEM_INTERFACE } from "interfaces";
import NoteItem from "../NoteItem/NoteItem";

const NoteList: React.FC<{
  notes: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[];
}> = (props) => {
  const { notes } = props;

  const selectedNoteHandler = (noteIndex: number) => {};

  return (
    <div className="scrollbar-box overflow-scroll overflow-x-hidden ">
      <ul className="relative grow flex flex-col gap-3 p-3 pb-6 bg-neutral-100 cursor-pointer">
        {notes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            index={index}
            onClick={selectedNoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
