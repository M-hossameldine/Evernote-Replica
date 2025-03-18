import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useInitAppAuth } from '~modules/auth/data/remote';
import { useAppSelector, selectIsLoggedIn } from '~store';

import Layout from './components/Layout';
import Notification from './components/Notification';
import { DefaultSpinner } from './components/Spinners';

import {
  CommonRouteVariants,
  AuthRouteVariants,
  NotesRouteVariants,
} from '~constants/routeVariants';

const PublicHomePage = React.lazy(
  () =>
    import(
      './modules/AuthFree/presentation/pages/PublicHomePage/PublicHomePage'
    )
);
const UserProfile = React.lazy(
  () => import('./modules/profile/presentation/pages/UserProfile')
);
const UserAuthPage = React.lazy(
  () => import('./modules/auth/presentation/pages/UserAuth/UserAuth')
);
const NotesPage = React.lazy(
  () => import('./modules/notes/presentation/pages/NotesPage')
);
const TrashPage = React.lazy(
  () => import('./modules/notes/presentation/pages/TrashPage')
);
const DownloadPage = React.lazy(
  () => import('./modules/AuthFree/presentation/pages/DownloadPage')
);

function App() {
  const { isAuthorized, isLoading: isLoadingAuth } = useInitAppAuth();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const ScreenLoading = () => (
    <div className="flex min-h-screen w-full items-center justify-center">
      <DefaultSpinner size="h-12 w-12" borderSize="border-4" />
    </div>
  );
  return (
    <>
      <Notification />

      {isLoadingAuth ? (
        <ScreenLoading />
      ) : (
        <Suspense fallback={<ScreenLoading />}>
          <Layout>
            <Routes>
              {!isAuthorized && (
                <>
                  <Route
                    path={CommonRouteVariants.publicHomePage.route}
                    element={<PublicHomePage />}
                  />
                  <Route
                    path={CommonRouteVariants.download.route}
                    element={<DownloadPage />}
                  />
                  <Route
                    path={AuthRouteVariants.auth.route}
                    element={<UserAuthPage />}
                  />
                </>
              )}
              {isAuthorized && (
                <>
                  <Route
                    path={CommonRouteVariants.userHomePage.route}
                    element={<UserProfile />}
                  />
                  <Route
                    path={NotesRouteVariants.activeNotes.route}
                    element={<NotesPage />}
                  />
                  <Route
                    path={NotesRouteVariants.note.route}
                    element={<NotesPage />}
                  />
                  <Route
                    path={NotesRouteVariants.trashNotes.route}
                    element={<TrashPage />}
                  />
                </>
              )}

              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      isLoggedIn
                        ? CommonRouteVariants.userHomePage.route
                        : CommonRouteVariants.publicHomePage.route
                    }
                  />
                }
              />
            </Routes>
          </Layout>
        </Suspense>
      )}
    </>
  );
}

export default App;
