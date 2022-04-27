import { useState } from 'react';

import ExecludeEventWrapper from '../ExecludeEventWrapper/ExecludeEventWrapper';
import Icons from '../../../constants/Icons';

const { IoIosMore } = Icons;

const DropdownMenu: React.FC = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // sebmenu visiblity handlers
  const toggleDropdonwHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };
  return (
    <ExecludeEventWrapper
      listenerHandler={hideDropdonwHandler}
      className='relative'
    >
      {/* Submenu trigger */}
      <button
        className='text-neutral-500 m-0 p-0'
        onClick={toggleDropdonwHandler}
      >
        <IoIosMore className='text-xl shrink-0' />
      </button>

      {/* Submenu */}
      <div
        className={`absolute right-0 top-[150%] z-10 bg-white whitespace-nowrap shadow-even-1 rounded text-sm ${
          isExpanded ? 'scale-100' : 'scale-0'
        }`}
        onClick={hideDropdonwHandler}
      ></div>
    </ExecludeEventWrapper>
  );
};

export default DropdownMenu;
