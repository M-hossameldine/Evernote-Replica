import { useAppDispatch } from '../../../hooks/redux-hooks';

import { NOTE_INTERFACE } from '../../../interfaces/note-interface';
import { fillNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import NoteItem from './NoteItem';

const NoteList: React.FC<{ notes: NOTE_INTERFACE[] }> = (props) => {
  const dispatch = useAppDispatch();
  const { notes } = props;

  const activateNoteHandler = (noteId: string) => {
    const { title, text } = notes.find((note) => note.id === noteId)!;
    dispatch(fillNoteEditor({ title, text, id: noteId }));
    // console.log('selectedNote', title);
  };

  return (
    <div className='scrollbar-box overflow-scroll overflow-x-hidden '>
      <ul className='relative grow flex flex-col gap-3 p-3 pb-6 bg-neutral-100 cursor-pointer'>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onClick={activateNoteHandler} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
