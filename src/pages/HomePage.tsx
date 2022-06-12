import { useAppSelector } from '../hooks';
import { selectIsloggedIn } from '../store';

import { HomePrivateHeader, WidgetsContainer } from '../components';
import { PublicHomePage } from './index';

const HomePage: React.FC = (props) => {
  const isLoggedIn = useAppSelector(selectIsloggedIn);

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
