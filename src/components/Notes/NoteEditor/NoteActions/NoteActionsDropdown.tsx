import { useState } from 'react';

import Icons from '../../../../constants/Icons';
import ExecludeEventWrapper from '../../../UI/ExecludeEventWrapper/ExecludeEventWrapper';

const { IoIosMore } = Icons;

const NoteActionsDropdown: React.FC = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdonwHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };

  return (
    <ExecludeEventWrapper listenerHandler={hideDropdonwHandler}>
      <div className='relative group'>
        <button
          className='text-neutral-500 m-0 p-0'
          onClick={toggleDropdonwHandler}
        >
          <IoIosMore className='text-xl shrink-0' />
        </button>

        <div
          className={`absolute right-0 top-[150%] bg-white whitespace-nowrap shadow-even-1 rounded text-sm ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
        >
          <div className='flex justify-between gap-4 p-4'>
            <button className='text-neutral-700'> Move to Trash </button>
            <span> Delete </span>
          </div>
        </div>
      </div>
    </ExecludeEventWrapper>
  );
};

export default NoteActionsDropdown;
