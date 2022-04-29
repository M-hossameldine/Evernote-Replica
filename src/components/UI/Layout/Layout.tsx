import SideNavBar from '../../SideNavBar/SideNavBar';

const Layout: React.FC = (props) => {
  return (
    <div className='flex w-full h-screen'>
      <SideNavBar />
      <main className='bg-neutral-200 w-full scrollbar-box overflow-y-scroll'>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
