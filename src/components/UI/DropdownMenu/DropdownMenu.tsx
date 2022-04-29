import { useState } from 'react';

import ExecludeEventWrapper from '../ExecludeEventWrapper/ExecludeEventWrapper';
import Submenu from './Submenu';
import {
  FUNCTION_ITEM_INTERFACE,
  ACTION_ITEM_INTERFACE,
} from '../../../interfaces/index';
import Icons from '../../../constants/Icons';

const { IoIosMore } = Icons;

interface MENU_INTERFACE {
  menuHeader: JSX.Element;
  submenuItemsData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[];
  className?: string;
}

const DropdownMenu: React.FC<MENU_INTERFACE> = (props) => {
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
      className={`relative ${props.className ? props.className : ''}`}
    >
      {/* Menu Header */}
      <button
        className='text-neutral-500 m-0 p-0'
        onClick={toggleDropdonwHandler}
      >
        {/* <IoIosMore className='text-xl shrink-0' /> */}
        {props.menuHeader}
      </button>

      {/* Submenu */}
      <Submenu
        className={`absolute right-0 top-[150%] z-10 bg-white whitespace-nowrap shadow-even-1 rounded text-sm ${
          isExpanded ? 'scale-100' : 'scale-0'
        }`}
        onClick={hideDropdonwHandler}
        submenuItemsData={props.submenuItemsData}
      ></Submenu>
    </ExecludeEventWrapper>
  );
};

export default DropdownMenu;
