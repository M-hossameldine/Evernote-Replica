import { useAppSelector, useLocationIndicator } from '../../../hooks';
import { MainUserSideNav, MainPublicNav } from '../..';
import { selectIsloggedIn } from '../../../store/shared-store';
import { AUTHPAGE } from '../../../constants';

const Layout: React.FC = (props) => {
  const isLoggedIn = useAppSelector(selectIsloggedIn);
  const location = useLocationIndicator();

  let layoutClasses = isLoggedIn ? ' flex w-full h-screen ' : ' pt-12 ';

  if (location.isInCurrentPath('auth')) {
    layoutClasses = '';
  }

  return (
    <>
      <main className={layoutClasses}>
        {isLoggedIn ? (
          <MainUserSideNav />
        ) : (
          !location.isInCurrentPath(AUTHPAGE) && <MainPublicNav />
        )}
        {isLoggedIn ? (
          <div className='bg-neutral-200 w-full scrollbar-box overflow-y-scroll'>
            {props.children}
          </div>
        ) : (
          props.children
        )}
      </main>
    </>
  );
};

export default Layout;
