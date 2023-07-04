import { useState } from "react";

import ExecludeEventWrapper from "../ExecludeEventWrapper/ExecludeEventWrapper";
import Submenu from "./Submenu";
import { FUNCTION_ITEM_INTERFACE, ACTION_ITEM_INTERFACE } from "interfaces";

interface MENU_INTERFACE {
  menuHeader: { content: JSX.Element; className?: string };
  submenuItemsData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[];
  className?: string;
  placeSubmenu?: {
    // default
    x?: "leftWinger" | "rightWinger" | "midfield" | string;
    y?: "top" | "bottom" | string;
  };
}

const DropdownMenu = (props: MENU_INTERFACE): React.ReactElement => {
  const { menuHeader } = props;
  const { placeSubmenu } = props;
  const [isExpanded, setIsExpanded] = useState(false); // set submenu visiblitily

  // sebmenu visiblity handlers
  const toggleDropdonwHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };

  // submenu position
  let submenuPosition = { x: "left-0", y: "top-[150%]" }; // default position bottom leftWinger
  if (placeSubmenu) {
    // Horizontal position
    if (placeSubmenu.x) {
      switch (placeSubmenu.x) {
        case "rightWinger":
          submenuPosition.x = "right-0";
          break;
        case "leftWinger":
          submenuPosition.x = "left-0";
          break;
        case "midfield":
          submenuPosition.x = "left-2/4 -translate-x-2/4";
          break;
        default:
          submenuPosition.x = placeSubmenu.x;
      }
    }

    // Vertical position
    if (placeSubmenu.y === "top" || placeSubmenu.y === "bottom") {
      submenuPosition.y =
        placeSubmenu.y === "top" ? "bottom-[130%]" : "top-[130%]";
    } else if (placeSubmenu.y) {
      submenuPosition.y = placeSubmenu.y;
    }
  }

  return (
    <ExecludeEventWrapper
      listenerHandler={hideDropdonwHandler}
      className={`relative ${props.className ? props.className : ""}`}
    >
      {/* Menu Header */}
      <button className={menuHeader.className} onClick={toggleDropdonwHandler}>
        {menuHeader.content}
      </button>

      {/* Submenu */}
      <Submenu
        className={`absolute z-10 ${submenuPosition.x} ${submenuPosition.y} 
        ${isExpanded ? "scale-100" : "scale-0"}
        bg-white whitespace-nowrap shadow-even-2 rounded text-sm py-2`}
        onClick={hideDropdonwHandler}
        submenuItemsData={props.submenuItemsData}
      />
    </ExecludeEventWrapper>
  );
};

export default DropdownMenu;
