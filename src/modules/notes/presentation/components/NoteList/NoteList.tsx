import { useMatch } from 'react-router-dom';
import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

import NoteItem from '../NoteItem/NoteItem';
import { NotesRouteVariants } from '~constants/routeVariants';

type PropsType = {
  notes: (Note | TrashNote)[];
  onSelectNote: (note: Note | TrashNote) => void;
};

const NoteList = (props: PropsType): React.ReactElement => {
  const { notes, onSelectNote } = props;
  const isTrashNotes = useMatch(NotesRouteVariants.trashNotes.route);

  return (
    <div className="scrollbar-box overflow-scroll overflow-x-hidden">
      <ul className="relative flex grow cursor-pointer flex-col gap-3 bg-neutral-100 p-3 pb-6">
        {notes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            index={index}
            onClick={onSelectNote.bind(null, note)}
            route={
              isTrashNotes
                ? NotesRouteVariants.trashNotes.pathname(note.id)
                : NotesRouteVariants.activeNotes.pathname(note.id)
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
