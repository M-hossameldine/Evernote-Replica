import { Link } from "react-router-dom";

import { HorizontalLogo, FaBars } from "assets/index";
import { HOMEPAGE, AUTHPAGE, DOWNLOADPAGE } from "utils/constants";
import { GhostLink } from "components";

const DesktopMenu: React.FC<{ onShowMenu: () => void }> = (props) => {
  return (
    <div className=" flex p-5 items-center container max-w-[75rem] mx-auto  ">
      <Link
        to={HOMEPAGE}
        className="flex title-font font-medium items-center text-gray-900 mr-auto"
      >
        <img src={HorizontalLogo} alt="Evernote logo" />
      </Link>

      {/* top menu nav */}

      {/* Utility nav */}
      <nav className="flex items-center text-base ml-auto">
        <ul className="hidden lg:flex gap-3 items-center">
          <Link
            to={`${AUTHPAGE}/login`}
            className=" font-semibold text-lg  text-neutral-700 hover:text-green-600"
          >
            Log In
          </Link>
          <GhostLink
            text="Download"
            route={DOWNLOADPAGE}
            colors={{
              textClr: "text-green-550",
              textHoverClr: "text-green-450",
              borderClr: "border-green-550",
              borderHoverClr: "border-green-450",
            }}
          />
        </ul>
        <button onClick={props.onShowMenu}>
          <FaBars className="lg:hidden shrink-0 text-2xl" />
        </button>
      </nav>
    </div>
  );
};

export default DesktopMenu;
