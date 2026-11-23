import { useMatch } from 'react-router-dom';
import type { Note } from '~modules/notes/domain/interfaces';

import NoteItem from '../NoteItem/NoteItem';
import { NotesRouteVariants } from '~constants/routeVariants';

type PropsType = {
  notes: Note[];
};

const NoteList = (props: PropsType): React.ReactElement => {
  const { notes } = props;
  const isTrashNotes = useMatch(NotesRouteVariants.trashNotes.route);

  return (
    <div className="scrollbar-box overflow-scroll overflow-x-hidden">
      <ul className="relative flex grow cursor-pointer flex-col gap-3 bg-neutral-100 p-3 pb-6">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
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
