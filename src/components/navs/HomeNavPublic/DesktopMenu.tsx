import { Link } from 'react-router-dom';

import { HorizontalLogo } from '../../../assets/index';
import { HOMEPAGE, AUTHPAGE } from '../../../constants/routes';
import { FaBars } from '../../../constants/Icons';

const DesktopMenu: React.FC<{ onShowMenu: () => void }> = (props) => {
  return (
    <div className=' flex p-5 items-center container max-w-[75rem] mx-auto  '>
      <Link
        to={HOMEPAGE}
        className='flex title-font font-medium items-center text-gray-900 mr-auto'
      >
        <img src={HorizontalLogo} alt='Evernote logo' />
      </Link>

      {/* top menu nav */}

      {/* Utility nav */}
      <nav className=' items-center text-base ml-auto'>
        <Link
          to={`${AUTHPAGE}/login`}
          className='hidden lg:block font-semibold text-lg mr-5 text-neutral-700 hover:text-green-600'
        >
          Log In
        </Link>

        <button onClick={props.onShowMenu}>
          <FaBars className='lg:hidden shrink-0 text-2xl' />
        </button>
      </nav>
    </div>
  );
};

export default DesktopMenu;
