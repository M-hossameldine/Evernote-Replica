import { useState } from 'react';

import { DesktopMenu, MobileMenu } from '../..';

const HomePublicNav: React.FC = (props) => {
  const [showMobileMenu, setShowMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMenu((prevState) => {
      console.log(prevState);
      return !prevState;
    });
  };

  return (
    <div className='fixed top-0 left-0 w-full text-gray-600 body-font'>
      <DesktopMenu onShowMenu={toggleMobileMenu} />
      <MobileMenu onClose={toggleMobileMenu} showMenu={showMobileMenu} />
    </div>
  );
};

export default HomePublicNav;
