import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useInitAppAuth } from '~modules/auth/data/remote';
import { useGetActiveNotesQuery } from '~modules/notes/data/remote';

import { AuthorizedLayout, PublicLayout } from './components/Layouts';
import Notification from './components/Notification';
import { ScreenLoading } from './components/Loading';

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
  // TODO: handle note initialization in a custom hook
  const { isLoading: isLoadingNotes } = useGetActiveNotesQuery(
    {},
    { skip: !isAuthorized }
  );

  const initialLoading = isLoadingAuth || isLoadingNotes;

  const Layout = isAuthorized ? AuthorizedLayout : PublicLayout;

  return (
    <>
      <Notification />

      {initialLoading ? (
        <ScreenLoading />
      ) : !isAuthorized ? (
        <Suspense fallback={<ScreenLoading />}>
          <Layout>
            <Routes>
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
              <Route
                path="*"
                element={
                  <Navigate to={CommonRouteVariants.publicHomePage.route} />
                }
              />
            </Routes>
          </Layout>
        </Suspense>
      ) : (
        <Layout>
          <Suspense fallback={<ScreenLoading />}>
            <Routes>
              <Route
                path={CommonRouteVariants.userHomePage.route}
                element={<UserProfile />}
              />
              <Route
                path={NotesRouteVariants.activeNotes.route}
                element={<NotesPage />}
              />
              <Route
                path={NotesRouteVariants.homeNote.route}
                element={<NotesPage />}
              />
              <Route
                path={NotesRouteVariants.trashNotes.route}
                element={<TrashPage />}
              />
              <Route
                path="*"
                element={
                  <Navigate to={CommonRouteVariants.userHomePage.route} />
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      )}
    </>
  );
}

export default App;
