import AddNoteWrapper from '../Notes/AddNoteWrapper/AddNoteWrapper';
import Icons from '../../constants/Icons';

const { BsPlus, IoIosArrowDown } = Icons;

const AddNewNoteTab: React.FC = () => {
  return (
    <AddNoteWrapper
      aria-label='New Note'
      className='flex items-center justify-center lg:justify-evenly text-white py-[6px] lg:px-2 rounded-3xl w-8 lg:w-auto aspect-square lg:aspect-auto bg-green-550 hover:opacity-90 cursor-pointer'
    >
      <BsPlus className='text-2xl shrink-0 mx-auto lg:mx-[unset]' />
      <span className='hidden lg:block'>New</span>
      <span className='hidden lg:block lg:ml-auto'>
        <IoIosArrowDown size='17' />
      </span>
    </AddNoteWrapper>
  );
};

export default AddNewNoteTab;
