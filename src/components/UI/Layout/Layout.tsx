import { useState } from 'react';
import { SideNavBar, HomePublicNav } from '../../shared-components';

const Layout: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn && (
        <div className='flex w-full h-screen'>
          <SideNavBar />
          <main className='bg-neutral-200 w-full scrollbar-box overflow-y-scroll'>
            {props.children}
          </main>
        </div>
      )}
      {!isLoggedIn && (
        <main>
          <HomePublicNav />
          {props.children}
        </main>
      )}
    </>
  );
};

export default Layout;
