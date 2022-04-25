import { Link, useParams } from 'react-router-dom';
import classes from './NoteItem.module.css';

import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setActiveNoteIndex } from '../../../store/noteEditor-slice/noteEditor-slice';
import { NOTE_INTERFACE } from '../../../interfaces/note-interface';
import { TRASH_ITEM_INTERFACE } from '../../../interfaces/trash-interface';
import { useLocationIndicator } from '../../../hooks/use-locationIndicator';

const NoteItem: React.FC<{
  note: NOTE_INTERFACE | TRASH_ITEM_INTERFACE;
  index: number;
  onClick?: (noteIndex: number) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const location = useLocationIndicator();
  const { note, index, onClick } = props;

  let { text, title, createdTimestamp } = 'note' in note ? note.note : note;

  const { id: localNoteId } = note;

  const noteFocusHandler = () => {
    dispatch(setActiveNoteIndex({ index }));
    console.log('index is set');
    if (props.onClick) {
      props.onClick(index);
    }
  };

  const createNoteTimestamp = new Date(createdTimestamp);
  const noteTimestampValue = `${createNoteTimestamp.toLocaleString('default', {
    month: 'short',
  })} ${createNoteTimestamp.getUTCDate()}`;

  let noteItemClasses = ` ${classes.note} ${
    localNoteId === params.noteId ? classes.active : ''
  } `;

  return (
    <Link
      className={noteItemClasses}
      to={`/${location.locationKey}/${localNoteId}`}
      onClick={noteFocusHandler}
    >
      <h3 className={classes['note__title']}>
        {title.length > 0 ? title : 'Untitled'}
      </h3>
      <p className={classes['note__body']}>{text}</p>
      <small className={classes['note__timestamp']}>{noteTimestampValue}</small>
    </Link>
  );
};

export default NoteItem;
