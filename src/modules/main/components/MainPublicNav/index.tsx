import { useState } from "react";
import { useEventListener } from "hooks";

import { DesktopMenu } from "../../components/MainPublicNav/DesktopMenu";
import { MobileMenu } from "../../components/MainPublicNav/MobileMenu";

export const MainPublicNav: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [navBoxShadow, setNavBoxShadow] = useState(false);

  // set Desktop Nav box shadow
  const windowScrollHandler = () => {
    window.scrollY >= 0 && window.scrollY <= 100
      ? setNavBoxShadow(false)
      : setNavBoxShadow(true);
  };

  useEventListener("scroll", windowScrollHandler);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevState) => {
      return !prevState;
    });
  };

  const boxShadowStyle = navBoxShadow ? "shadow-md" : "";

  return (
    <div
      className={`fixed left-0 top-0 z-10 w-full bg-white text-gray-600 ${boxShadowStyle} body-font transition-all duration-100`}
    >
      <DesktopMenu onShowMenu={toggleMobileMenu} />
      <MobileMenu onClose={toggleMobileMenu} showMenu={showMobileMenu} />
    </div>
  );
};

export default MainPublicNav;
