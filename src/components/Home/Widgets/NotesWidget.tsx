import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectNotes } from '../../../store/notes-slice/notes-slice';

import AddNoteWrapper from '../../Notes/AddNoteWrapper/AddNoteWrapper';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Card from '../../UI/Card/Card';
import NoteItem from '../../Notes/NoteItem/NoteItem';
import { NOTESPAGE, EDITORPAGE } from '../../../constants/routes';
import {
  FUNCTION_ITEM_INTERFACE,
  ACTION_ITEM_INTERFACE,
} from '../../../interfaces/index';
import { sendNewNoteData } from '../../../store/notes-slice/notes-actions';
import Icons from '../../../constants/Icons';

const { IoIosArrowForward, MdPostAdd, IoIosMore } = Icons;

const NotesWidget: React.FC<{ className?: string }> = (props) => {
  const notes = useAppSelector(selectNotes);
  const navigate = useNavigate();

  const firstNote = notes.length > 0 ? notes[0].id : 'empty';

  const dropdownData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[] = [
    {
      id: uuid(),
      text: 'Go to notes',
      onClick: () => navigate(`${NOTESPAGE}/${firstNote}`),
    },
    {
      id: uuid(),
      text: 'Create new note',
      asyncAction: sendNewNoteData,
      operation: 'add',
    },
  ];

  const notesWidgetClasses = props.className ? props.className : '';

  return (
    <Card className={` ${notesWidgetClasses} overflow-hidden`}>
      <header className='flex items-center p-2'>
        <Link
          to={`${NOTESPAGE}/${firstNote}`}
          className='flex items-center uppercase text-neutral-800 hover:bg-neutral-100 p-1 rounded'
        >
          Notes
          <IoIosArrowForward
            size='14'
            className='shrink-0  text-green-500 mx-2 my-auto'
          />
        </Link>

        <AddNoteWrapper className='ml-auto p-1 hover:bg-neutral-100 rounded'>
          <MdPostAdd size='20' className='shrink-0 text-neutral-600' />
        </AddNoteWrapper>

        <DropdownMenu
          menuHeader={<IoIosMore />}
          className='ml-2'
          submenuItemsData={dropdownData}
          placeSubmenu={{ x: 'rightWinger', y: 'bottom' }}
        />
      </header>

      {/* notes list */}
      <div className='scrollbar-box overflow-hidden overflow-x-scroll p-3'>
        <ul className='flex gap-3 '>
          {notes.map((note, index) => (
            <li
              key={note.id}
              className='min-w-[11rem] rounded-md shadow-even-1'
            >
              <NoteItem
                note={note}
                index={index}
                className='p2'
                route={EDITORPAGE}
              />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default NotesWidget;
