import { useState } from 'react';

import {
  HomePublicNav,
  HomePrivateHeader,
  WidgetsContainer,
} from '../components/shared-components';

const HomePage: React.FC = (props) => {
  return (
    <>
      {/* user is not authorized */}
      {true && (
        <>
          <HomePublicNav />
        </>
      )}

      {/* user is authorized */}
      {false && (
        <>
          <HomePrivateHeader />
          <WidgetsContainer />
        </>
      )}
    </>
  );
};

export default HomePage;
