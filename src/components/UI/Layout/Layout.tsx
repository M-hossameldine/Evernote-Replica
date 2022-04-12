import SideNavBar from '../../SideNavBar/SideNavBar';

const Layout: React.FC = (props) => {
  return (
    <>
      <div className='flex'>
        <SideNavBar />
        <main className='grow'>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
