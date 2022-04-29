import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hooks';

import { selectNotes } from '../../../store/notes-slice/notes-slice';
import AddNoteWrapper from '../../Notes/AddNoteWrapper/AddNoteWrapper';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import { NOTESPAGE } from '../../../constants/routes';
import {
  FUNCTION_ITEM_INTERFACE,
  ACTION_ITEM_INTERFACE,
} from '../../../interfaces/index';
import Icons from '../../../constants/Icons';

const { IoIosArrowForward, MdPostAdd, IoIosMore } = Icons;

const NotesWidget: React.FC = (props) => {
  const notes = useAppSelector(selectNotes);
  const navigate = useNavigate();

  const firstNote = notes.length > 0 ? notes[0].id : 'empty';

  const dropdownData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[] = [
    {
      text: 'Go to notes',
      onClick: () => navigate(`${NOTESPAGE}/${firstNote}`),
    },
  ];

  return (
    <div>
      <nav className='flex items-center'>
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
          <MdPostAdd size='20' className='shrink-0' />
        </AddNoteWrapper>
        <DropdownMenu
          menuHeader={<IoIosMore />}
          submenuItemsData={dropdownData}
          className='ml-2'
        />
      </nav>
    </div>
  );
};

export default NotesWidget;
