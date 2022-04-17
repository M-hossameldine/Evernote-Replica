import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';

import { addNote } from '../../store/notes-slice/notes-slice';
import Icons from '../../constants/Icons';
import { createNote } from '../../interfaces/note-interface';
import { NOTESPAGE } from '../../constants/routes';

const { BsPlus, IoIosArrowDown } = Icons;

const AddNewNoteTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const timestamp = new Date().toISOString();

  const addNoteHandler = () => {
    dispatch(addNote(createNote('', '', timestamp)));
    navigate(NOTESPAGE);
  };

  return (
    <button
      aria-label='New Note'
      className='flex items-center justify-center lg:justify-evenly text-white py-[6px] lg:px-2 rounded-3xl w-8 lg:w-auto aspect-square lg:aspect-auto bg-green-550 hover:opacity-90 cursor-pointer'
      onClick={addNoteHandler}
    >
      <BsPlus className='text-2xl shrink-0 mx-auto lg:mx-[unset]' />
      <span className='hidden lg:block'>New</span>
      <span className='hidden lg:block lg:ml-auto'>
        <IoIosArrowDown size='17' />
      </span>
    </button>
  );
};

export default AddNewNoteTab;
