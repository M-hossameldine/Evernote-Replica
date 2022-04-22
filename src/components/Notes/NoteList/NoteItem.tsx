import { Link } from 'react-router-dom';
import classes from './NoteItem.module.css';

import { NOTE_INTERFACE } from '../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../interfaces/trash-interface';
import { NOTESPAGE } from '../../../constants/routes';

const NoteItem: React.FC<{
  note: NOTE_INTERFACE | TRASH_ITEM_INTERFACE;
  onClick?: (noteId: string) => void;
}> = (props) => {
  const { note, onClick } = props;

  let { text, title, createdTimestamp } = 'note' in note ? note.note : note;

  const createNoteTimestamp = new Date(createdTimestamp);
  const { id: selectedNoteId } = 'note' in note ? note.note : note;

  const noteTimestampValue = `${createNoteTimestamp.toLocaleString('default', {
    month: 'short',
  })} ${createNoteTimestamp.getUTCDate()}`;

  const noteFocusHandler = () => {
    if (props.onClick) {
      props.onClick(selectedNoteId);
    }
  };

  return (
    <Link className={classes.note} to={`${NOTESPAGE}/${selectedNoteId}`}>
      <h3 className={classes['note__title']}>
        {title.length > 0 ? title : 'Untitled'}
      </h3>
      <p className={classes['note__body']}>{text}</p>
      <small className={classes['note__timestamp']}>{noteTimestampValue}</small>
    </Link>
  );
};

export default NoteItem;
