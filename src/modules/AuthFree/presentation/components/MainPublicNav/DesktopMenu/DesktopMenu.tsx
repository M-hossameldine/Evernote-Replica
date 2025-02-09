import { Link } from "react-router-dom";

import { HorizontalLogo, FaBars } from "assets/index";
import { HOMEPAGE, DOWNLOADPAGE } from "utils/constants";
import { GhostLink } from "components";

import { AuthRouteVariants } from "constants/routeVariants";
import { AuthMode } from "constants/AppEnums/AuthEnums";

type Props = { onShowMenu: () => void };

export const DesktopMenu = (props: Props): React.ReactElement => {
  return (
    <div className="container mx-auto flex max-w-[75rem] items-center p-5">
      <Link
        to={HOMEPAGE}
        className="title-font mr-auto flex items-center font-medium text-gray-900"
      >
        <img src={HorizontalLogo} alt="Evernote logo" />
      </Link>

      {/* top menu nav */}

      {/* Utility nav */}
      <nav className="ml-auto flex items-center text-base">
        <ul className="hidden items-center gap-3 lg:flex">
          <Link
            to={AuthRouteVariants.auth.pathname(AuthMode.LOGIN)}
            className="text-lg font-semibold text-neutral-700 hover:text-green-600"
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
          <FaBars className="shrink-0 text-2xl lg:hidden" />
        </button>
      </nav>
    </div>
  );
};

export default DesktopMenu;
