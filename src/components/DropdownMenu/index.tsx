import { useState } from 'react';

import type { SubmenuFunctionItemProps } from './SubmenuFunctionItem';

import ExcludeEventWrapper from '../ExcludeEventWrapper';
import Submenu from './Submenu';

interface DropdownMenuProps {
  menuHeader: { content: JSX.Element; className?: string };
  submenuItemsData: SubmenuFunctionItemProps[];
  className?: string;
  placeSubmenu?: {
    // default
    x?: 'start' | 'end' | 'center' | string;
    y?: 'top' | 'bottom' | string;
  };
}

const DropdownMenu = (props: DropdownMenuProps): React.ReactElement => {
  const { menuHeader } = props;
  const { placeSubmenu } = props;
  const [isExpanded, setIsExpanded] = useState(false); // set submenu visibility

  // submenu visibility handlers
  const toggleDropdownHandler = () => {
    setIsExpanded(prevState => !prevState);
  };

  const hideDropdownHandler = () => {
    setIsExpanded(false);
  };

  // submenu position
  const submenuPosition = { x: 'left-0', y: 'top-[150%]' }; // default position bottom start
  if (placeSubmenu) {
    // Horizontal position
    if (placeSubmenu.x) {
      switch (placeSubmenu.x) {
        case 'end':
          submenuPosition.x = 'right-0';
          break;
        case 'start':
          submenuPosition.x = 'left-0';
          break;
        case 'center':
          submenuPosition.x = 'left-2/4 -translate-x-2/4';
          break;
        default:
          submenuPosition.x = placeSubmenu.x;
      }
    }

    // Vertical position
    if (placeSubmenu.y === 'top' || placeSubmenu.y === 'bottom') {
      submenuPosition.y =
        placeSubmenu.y === 'top' ? 'bottom-[130%]' : 'top-[130%]';
    } else if (placeSubmenu.y) {
      submenuPosition.y = placeSubmenu.y;
    }
  }

  return (
    <ExcludeEventWrapper
      listenerHandler={hideDropdownHandler}
      className={`relative ${props.className ? props.className : ''}`}
    >
      {/* Menu Header */}
      <button className={menuHeader.className} onClick={toggleDropdownHandler}>
        {menuHeader.content}
      </button>

      {/* Submenu */}
      <Submenu
        className={`absolute z-10 ${submenuPosition.x} ${submenuPosition.y} ${isExpanded ? 'scale-100' : 'scale-0'} whitespace-nowrap rounded bg-white py-2 text-sm shadow-even-2`}
        onClick={hideDropdownHandler}
        submenuItemsData={props.submenuItemsData}
      />
    </ExcludeEventWrapper>
  );
};

export default DropdownMenu;
