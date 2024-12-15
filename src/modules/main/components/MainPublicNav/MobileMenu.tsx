import { Link } from "react-router-dom";

import { HorizontalLogo, GrClose } from "assets";
import { HOMEPAGE, AUTHPAGE, DOWNLOADPAGE } from "utils/constants/routes";
import { GhostLink, ExecludeEventWrapper } from "components";

type PropsType = {
  onClose: () => void;
  className?: string;
  showMenu: boolean;
};

export const MobileMenu = (props: PropsType): React.ReactElement => {
  const { onClose, className, showMenu } = props;

  const outsideClickHandler = () => {
    onClose();
  };

  const menuClasses = `
    fixed top-0 left-0 w-full bg-black/[0.7]  
    transition-all duration-300 ease-in  
    ${showMenu ? " z-10 opacity-100 " : " z-[-2] opacity-0 "} 
    ${className ? className : ""}
  `;

  return (
    <div className={menuClasses}>
      {showMenu && (
        <ExecludeEventWrapper
          listenerHandler={outsideClickHandler}
          className="ml-auto h-screen w-full max-w-[26rem] bg-white p-5"
        >
          <div className="mb-5 flex items-center justify-between md:mb-0">
            <Link to={HOMEPAGE} className="font-medium xs:hidden">
              <img src={HorizontalLogo} alt="Evernote logo" />
            </Link>
            {/* close Button */}
            <button className="ml-auto" onClick={() => props.onClose()}>
              <GrClose className="shrink-0 text-2xl" />
            </button>
          </div>
          <nav>
            <ul className="font-bold uppercase">
              <li className="border-b-[1px] border-neutral-100 py-4 text-sm text-neutral-700 hover:text-green-550">
                <Link
                  to={`${AUTHPAGE}/login`}
                  className="mr-5 font-bold text-neutral-700 hover:text-green-550"
                >
                  Log In
                </Link>
              </li>

              {/* download App */}
              <li>
                <GhostLink
                  text="Download"
                  colors={{
                    textClr: "text-green-550",
                    textHoverClr: "text-green-450",
                    borderClr: "border-green-550",
                    borderHoverClr: "border-green-450",
                  }}
                  className="mx-auto mt-12 px-[5em] text-sm font-semibold"
                  route={DOWNLOADPAGE}
                  onClick={props.onClose}
                />
              </li>
            </ul>
          </nav>
        </ExecludeEventWrapper>
      )}
    </div>
  );
};

export default MobileMenu;
