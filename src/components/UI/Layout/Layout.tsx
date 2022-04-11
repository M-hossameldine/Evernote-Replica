import SideNavBar from '../../SideNavBar/SideNavBar';

const Layout: React.FC = (props) => {
  return (
    <>
      <SideNavBar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
