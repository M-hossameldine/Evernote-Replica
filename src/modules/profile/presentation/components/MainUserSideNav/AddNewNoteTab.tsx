import AddNoteWrapper from 'modules/notes/presentation/components/AddNoteWrapper/AddNoteWrapper';
import { BsPlus, IoIosArrowDown } from 'assets';

export const AddNewNoteTab: React.FC = () => {
  return (
    <AddNoteWrapper
      aria-label="New Note"
      className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-3xl bg-green-550 py-[6px] text-white hover:opacity-90 lg:aspect-auto lg:w-auto lg:justify-evenly lg:px-2"
    >
      <BsPlus className="mx-auto shrink-0 text-2xl lg:mx-[unset]" />
      <span className="hidden lg:block">New</span>
      <span className="hidden lg:ml-auto lg:block">
        <IoIosArrowDown size="17" />
      </span>
    </AddNoteWrapper>
  );
};

export default AddNewNoteTab;
