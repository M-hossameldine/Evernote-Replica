import { useAppSelector } from 'hooks';
import { selectIsLoggedIn } from 'store';

import PublicHomePage from 'modules/AuthFree/presentation/pages/PublicHomePage/PublicHomePage';
import UserProfile from 'modules/profile/presentation/pages/UserProfile';

const HomePage: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      {/* user is not authorized */}
      {!isLoggedIn && <PublicHomePage />}

      {/* user is authorized */}
      {isLoggedIn && <UserProfile />}
    </>
  );
};

export default HomePage;
