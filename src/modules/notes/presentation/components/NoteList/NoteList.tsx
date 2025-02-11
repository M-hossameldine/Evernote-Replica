import { TRASH_ITEM_INTERFACE } from "interfaces";
import { Note } from "modules/notes/domain/interfaces/Note";
import NoteItem from "../NoteItem/NoteItem";

type PropsType = {
  notes: (Note | TRASH_ITEM_INTERFACE)[];
};

const NoteList = (props: PropsType): React.ReactElement => {
  const { notes } = props;

  const selectedNoteHandler = () => {
    // todo: add selected note logic using noteIndex
  };

  return (
    <div className="scrollbar-box overflow-scroll overflow-x-hidden">
      <ul className="relative flex grow cursor-pointer flex-col gap-3 bg-neutral-100 p-3 pb-6">
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
