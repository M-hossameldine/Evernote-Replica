import { useAppSelector } from '../../hooks/redux-hooks';
import { selectNotes } from '../../store/notes-slice/notes-slice';
import { sendNewNoteData } from '../../store/notes-slice/notes-actions';
import { NOTESPAGE } from '../../constants/routes';
import { useUpdatedState } from '../../hooks/use-updatedState';
import Icons from '../../constants/Icons';

const { BsPlus, IoIosArrowDown } = Icons;

const AddNewNoteTab: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const notesUpdatedState = useUpdatedState({
    asyncAction: sendNewNoteData,
    route: NOTESPAGE,
    usedIndex: 0,
    watchedState: notes,
    operation: 'add',
  });

  const addNoteHandler = () => {
    notesUpdatedState.dispatchActionHandler();
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
