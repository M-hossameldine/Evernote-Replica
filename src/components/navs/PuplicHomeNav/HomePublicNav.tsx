import { Link } from 'react-router-dom';
import { HorizontalLogo } from '../../../assets/index';
import { HOMEPAGE, AUTHPAGE } from '../../../constants/routes';

const HomePublicNav: React.FC = (props) => {
  return (
    <div className='fixed top-0 left-0 w-full text-gray-600 body-font'>
      <div className=' flex flex-wrap p-5 flex-col md:flex-row items-center container max-w-[75rem] mx-auto  '>
        <Link
          to={HOMEPAGE}
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <img src={HorizontalLogo} alt='Evernote logo' />
        </Link>

        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <Link
            to={`${AUTHPAGE}/login`}
            className='font-semibold text-lg mr-5 text-neutral-700 hover:text-green-600'
          >
            Log In
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default HomePublicNav;
