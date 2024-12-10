import { useAppSelector, useLocationIndicator } from "hooks";
import MainUserSideNav from "modules/profile/components/MainUserSideNav";
import { MainPublicNav } from "modules/main/components/MainPublicNav/";
import { selectIsLoggedIn } from "store";
import { AUTHPAGE } from "utils/constants";

type PropsType = {
  children?: React.ReactNode;
  className?: string;
};

const Layout = (props: PropsType): React.ReactElement => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocationIndicator();

  let layoutClasses = isLoggedIn ? " flex w-full h-screen " : " pt-12 ";

  if (location.isInCurrentPath("auth")) {
    layoutClasses = "";
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
          <div className="bg-neutral-200 w-full scrollbar-box overflow-y-scroll">
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
