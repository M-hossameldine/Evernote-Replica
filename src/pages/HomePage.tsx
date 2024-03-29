import { useAppSelector } from "hooks";
import { selectIsLoggedIn } from "store";

import { HomePrivateHeader, WidgetsContainer } from "components";
import { PublicHomePage } from "pages";

const HomePage: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      {/* user is not authorized */}
      {!isLoggedIn && <PublicHomePage />}

      {/* user is authorized */}
      {isLoggedIn && (
        <>
          <HomePrivateHeader />
          <WidgetsContainer />
        </>
      )}
    </>
  );
};

export default HomePage;
