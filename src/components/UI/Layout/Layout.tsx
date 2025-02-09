import { useAppSelector } from "hooks";
import { useMatch } from "react-router-dom";
import MainUserSideNav from "modules/profile/components/MainUserSideNav";
import { MainPublicNav } from "modules/main/components/MainPublicNav/";
import { selectIsLoggedIn } from "store";
import { AuthRouteVariants } from "constants/routeVariants";

type PropsType = {
  children?: React.ReactNode;
  className?: string;
};

const Layout = (props: PropsType): React.ReactElement => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const match = useMatch(AuthRouteVariants.auth.route);
  const isAuthPage = !!match;

  let layoutClasses = isLoggedIn ? " flex w-full h-screen " : " pt-12 ";

  if (isAuthPage) {
    layoutClasses = "";
  }

  return (
    <>
      <main className={layoutClasses}>
        {isLoggedIn ? <MainUserSideNav /> : !isAuthPage && <MainPublicNav />}
        {isLoggedIn ? (
          <div className="scrollbar-box w-full overflow-y-scroll bg-neutral-200">
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
