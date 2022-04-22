import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddNewNote } from '../../hooks/use-addNewNote';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { selectNotes } from '../../store/notes-slice/notes-slice';
import { sendNewNoteData } from '../../store/notes-slice/notes-actions';
import Icons from '../../constants/Icons';

const { BsPlus, IoIosArrowDown } = Icons;

const AddNewNoteTab: React.FC = () => {
  const { addToStore } = useAddNewNote();
  const notes = useAppSelector(selectNotes);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addNoteHandler = () => {
    // addToStore();
    dispatch(sendNewNoteData());
    console.log('clicked');
  };

  useEffect(() => {
    if (notes.length > 0) {
      const firstNoteId = notes[0].id;
      navigate(`/notes/${firstNoteId}`);
    }
  }, [notes]);

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
