import classes from './NoteItem.module.css';

import { Link, useParams } from 'react-router-dom';

import type { Note } from '~modules/notes/domain/interfaces';

type PropsType = {
  note: Note;
  className?: string;
  route: string;
};

export const NoteItem = (props: PropsType): React.ReactElement => {
  const params = useParams();
  const { note, className, route } = props;

  const { id: noteId, text, title, createdAt } = note;

  // e.g. "Nov 24", in the user's local time zone
  const noteTimestampValue = new Date(createdAt).toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
  });

  // style
  const noteItemClasses = ` ${classes.note} block
    ${noteId === params.noteId ? classes.active : ''}
    ${className ? className : ''}`;

  return (
    <Link className={noteItemClasses} to={route}>
      <h3 className={classes['note__title']}>
        {title?.length > 0 ? title : 'Untitled'}
      </h3>
      <p className={classes['note__body']}>{text}</p>
      <small className={classes['note__timestamp']}>{noteTimestampValue}</small>
    </Link>
  );
};

export default NoteItem;
