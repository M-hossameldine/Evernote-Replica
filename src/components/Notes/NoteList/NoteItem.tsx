import classes from './NoteItem.module.css';

import NoteModel from '../../../models/NoteModel';

const NoteItem: React.FC<{ note: NoteModel }> = (props) => {
  const { note } = props;

  const noteTimestamp = `${note.timestamp.toLocaleString('default', {
    month: 'short',
  })} ${note.timestamp.getUTCDate()}`;

  return (
    <li className={classes.note}>
      <h3 className={classes['note__title']}>{note.title}</h3>
      <p className={classes['note__body']}>{note.body}</p>
      <small className={classes['note__timestamp']}>{noteTimestamp}</small>
    </li>
  );
};

export default NoteItem;
