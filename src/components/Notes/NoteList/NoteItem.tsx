import classes from './NoteItem.module.css';

import { NOTE_INTERFACE } from '../../../interfaces/note-interface';

const NoteItem: React.FC<{
  note: NOTE_INTERFACE;
  onClick?: (noteId: string) => void;
}> = (props) => {
  const { note, onClick } = props;

  const createNoteTimestamp = new Date(note.createdTimestamp);

  const noteTimestampValue = `${createNoteTimestamp.toLocaleString('default', {
    month: 'short',
  })} ${createNoteTimestamp.getUTCDate()}`;

  const noteFocusHandler = () => {
    if (props.onClick) {
      props.onClick(note.id);
    }
  };

  return (
    <li className={classes.note} onClick={noteFocusHandler}>
      <h3 className={classes['note__title']}>
        {note.title.length > 0 ? note.title : 'Untitled'}
      </h3>
      <p className={classes['note__body']}>{note.text}</p>
      <small className={classes['note__timestamp']}>{noteTimestampValue}</small>
    </li>
  );
};

export default NoteItem;
