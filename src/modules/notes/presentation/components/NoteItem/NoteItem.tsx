import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useLocationIndicator } from '~hooks';

import { setActiveNoteIndex } from '~modules/notes/data/local/noteEditor-slice';

import classes from './NoteItem.module.css';

type PropsType = {
  note: Note | TrashNote;
  index: number;
  className?: string;
  route?: string;
  onClick?: (noteIndex: number) => void;
};

export const NoteItem = (props: PropsType): React.ReactElement => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const location = useLocationIndicator();
  const { note, index, className, route } = props;

  const { text, title, createdTimestamp } = 'note' in note ? note.note : note;

  const { id: localNoteId } = note;

  const noteFocusHandler = () => {
    dispatch(setActiveNoteIndex({ index }));

    if (props.onClick) {
      props.onClick(index);
    }
  };

  // navigation link
  const navigationLink = route
    ? `${route}/${localNoteId}`
    : `/${location.locationKey}/${localNoteId}`;

  // date form
  const createNoteTimestamp = new Date(createdTimestamp);
  const noteTimestampValue = `${createNoteTimestamp.toLocaleString('default', {
    month: 'short',
  })} ${createNoteTimestamp.getUTCDate()}`;

  // style
  const noteItemClasses = ` ${classes.note} block
    ${localNoteId === params.noteId ? classes.active : ''} 
    ${className ? className : ''}`;

  return (
    <Link
      className={noteItemClasses}
      to={navigationLink}
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
