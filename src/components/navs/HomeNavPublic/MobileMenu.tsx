import { Link } from 'react-router-dom';

import { HorizontalLogo } from '../../../assets/index';
import { HOMEPAGE, AUTHPAGE, DOWNLOADPAGE } from '../../../constants/routes';
import { GhostLink, ExecludeEventWrapper } from '../..';
import { GrClose } from '../../../assets/index';

const MobileMenu: React.FC<{
  onClose: () => void;
  className?: string;
  showMenu: boolean;
}> = (props) => {
  const { onClose, className, showMenu } = props;

  const outsideClickHandler = () => {
    props.onClose();
  };

  const menuClasses = `
    fixed top-0 left-0 w-full bg-black/[0.7]  
    transition-all duration-300 ease-in  
    ${showMenu ? ' z-10 opacity-100 ' : ' z-[-2] opacity-0 '} 
    ${className ? className : ''}
  `;

  return (
    <div className={menuClasses}>
      {showMenu && (
        <ExecludeEventWrapper
          listenerHandler={outsideClickHandler}
          className='w-full max-w-[26rem] h-screen p-5 bg-white ml-auto'
        >
          <div className=' flex justify-between items-center mb-5 md:mb-0'>
            <Link to={HOMEPAGE} className='xs:hidden font-medium'>
              <img src={HorizontalLogo} alt='Evernote logo' />
            </Link>
            {/* close Button */}
            <button className='ml-auto' onClick={() => props.onClose()}>
              <GrClose className='shrink-0 text-2xl' />
            </button>
          </div>
          <nav>
            <ul className='uppercase font-bold'>
              <li className='text-sm text-neutral-700 hover:text-green-550 py-4 border-b-[1px] border-neutral-100  '>
                <Link
                  to={`${AUTHPAGE}/login`}
                  className='font-bold mr-5 text-neutral-700 hover:text-green-550'
                >
                  Log In
                </Link>
              </li>
            </ul>
            {/* download App */}
            <GhostLink
              text='Download'
              colors={{
                textClr: 'text-green-550',
                textHoverClr: 'text-green-450',
                borderClr: 'border-green-550',
                borderHoverClr: 'border-green-450',
              }}
              className='text-sm font-semibold px-[5em] mx-auto mt-12'
              route={DOWNLOADPAGE}
            />
          </nav>
        </ExecludeEventWrapper>
      )}
    </div>
  );
};

export default MobileMenu;
