import NoteModel from '../../../models/NoteModel';
import NoteItem from './NoteItem';

const NoteList: React.FC<{ notes: NoteModel[] }> = (props) => {
  const { notes } = props;

  return (
    <div className='scrollbar-box overflow-scroll overflow-x-hidden'>
      <ul className='relative grow flex flex-col gap-3 p-3 pb-6 bg-neutral-100 '>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
