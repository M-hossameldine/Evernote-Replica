import { useAppSelector, useLocationIndicator } from '../../../hooks';
import { MainUserSideNav, MainPublicNav } from '../..';
import { selectIsloggedIn } from '../../../store/shared-store';
import { AUTHPAGE } from '../../../constants';

const Layout: React.FC = (props) => {
  const isLoggedIn = useAppSelector(selectIsloggedIn);
  const location = useLocationIndicator();

  let layoutClasses = isLoggedIn ? ' flex w-full h-screen ' : ' pt-12 ';

  // if (!isLoggedIn) {
  //   layoutClasses += ;
  // } else if (isLoggedIn) {
  //   layoutClasses = ;
  // }

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
      {/* {isLoggedIn && (
        <main className='flex w-full h-screen'>
          <MainUserSideNav />
          <div className='bg-neutral-200 w-full scrollbar-box overflow-y-scroll'>
            {props.children}
          </div>
        </main>
      )}
      {!isLoggedIn && (
        <main className='pt-12'>
          <MainPublicNav />
          {props.children}
        </main>
      )} */}
    </>
  );
};

export default Layout;
