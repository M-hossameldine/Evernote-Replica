import type { Note, TrashNote } from 'modules/notes/domain/interfaces';
import NoteItem from '../NoteItem/NoteItem';

type PropsType = {
  notes: (Note | TrashNote)[];
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
