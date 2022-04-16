import classes from './NoteItem.module.css';

import NoteModel from '../../../models/NoteModel';

const NoteItem: React.FC<{ note: NoteModel; onClick?: () => void }> = (
  props
) => {
  const { note, onClick } = props;

  const createNoteTimestamp = new Date(note.createdTimestamp);
  const noteTimestamp = `${createNoteTimestamp.toLocaleString('default', {
    month: 'short',
  })} ${createNoteTimestamp.getUTCDate()}`;

  return (
    <li className={classes.note} onClick={onClick}>
      <h3 className={classes['note__title']}>{note.title}</h3>
      <p className={classes['note__body']}>{note.text}</p>
      <small className={classes['note__timestamp']}>{noteTimestamp}</small>
    </li>
  );
};

export default NoteItem;
