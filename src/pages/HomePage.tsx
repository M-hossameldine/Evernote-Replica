import { useState } from 'react';

import {
  // HomePublicNav,
  HomePrivateHeader,
  WidgetsContainer,
  HeroSection,
} from '../components';

import { AUTHPAGE } from '../constants/routes';

const HomePage: React.FC = (props) => {
  return (
    <>
      {/* user is not authorized */}
      {true && (
        <div className=''>
          {/* <HomePublicNav /> */}
          <HeroSection
            title='Tame your work, organize your life'
            description='Remember everything and tackle any project with your notes, tasks, and schedule all in one place.'
            className='mt-28 '
            primeBtn={{
              text: 'Sign up for free',
              route: `${AUTHPAGE}/register`,
              className: 'text-lg ',
            }}
            secondaryBtns={[
              {
                text: 'Already have an account? Log in',
                route: `${AUTHPAGE}/login`,
                className:
                  'font-semibold text-lg text-neutral-500 hover:text-green-450',
              },
            ]}
          />
        </div>
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
