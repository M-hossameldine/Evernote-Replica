import AddNoteWrapper from '~modules/notes/presentation/components/AddNoteWrapper/AddNoteWrapper';

import { BsPlus } from 'react-icons/bs';

export const AddNewNoteTab: React.FC = () => {
  return (
    <AddNoteWrapper
      aria-label="New Note"
      className="flex aspect-square w-8 cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-green-550 py-[6px] text-white hover:opacity-90 lg:aspect-auto lg:w-auto lg:justify-start lg:px-2"
    >
      <BsPlus className="shrink-0 text-2xl lg:mx-[unset]" />
      <span className="hidden lg:block">New</span>
    </AddNoteWrapper>
  );
};

export default AddNewNoteTab;
