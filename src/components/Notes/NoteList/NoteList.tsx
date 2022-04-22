import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { useLocationIndicator } from '../../../hooks/use-locationIndicator';

import { selectNotes } from '../../../store/notes-slice/notes-slice';
import { NOTE_INTERFACE } from '../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../interfaces/trash-interface';
import { fillNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import NoteItem from './NoteItem';
import { NOTESPAGE } from '../../../constants/routes';

const NoteList: React.FC<{
  notes: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[];
}> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { locationKey } = useLocationIndicator();

  const { notes } = props; // received

  // const activateNoteHandler = (noteId: string) => {
  //   const existedNote = notes.find((note) => note.id === noteId)!;

  //   const { title, text } =
  //     'note' in existedNote ? existedNote.note : existedNote;
  //   dispatch(fillNoteEditor({ title, text, id: noteId }));
  // };

  return (
    <div className='scrollbar-box overflow-scroll overflow-x-hidden '>
      <ul className='relative grow flex flex-col gap-3 p-3 pb-6 bg-neutral-100 cursor-pointer'>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

export const status = ['open', 'pending', 'closed'] as const;

export type status = typeof status[number];

let state: status = 'open';
