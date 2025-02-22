import { AuthRouteVariants } from 'constants/routeVariants';
import {
  DOWNLOADPAGE,
  EDITORPAGE,
  HOMEPAGE,
  NOTESPAGE,
  TRASHPAGE,
} from 'constants/routes';
import { useInitAppAuth } from 'modules/auth/data/remote';

import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Notification from './components/Notification';
import { DefaultSpinner } from './components/Spinners';

const UserAuthPage = React.lazy(
  () => import('./modules/auth/presentation/pages/UserAuth/UserAuth')
);
const HomePage = React.lazy(() => import('./pages/HomePage'));
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
  const { isAuthorized } = useInitAppAuth();

  return (
    <>
      <Notification />

      <Layout>
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
              <DefaultSpinner size="h-12 w-12" borderSize="border-4" />
            </div>
          }
        >
          <Routes>
            <Route path={HOMEPAGE} element={<HomePage />} />

            {!isAuthorized && (
              <>
                <Route path={DOWNLOADPAGE} element={<DownloadPage />} />
                <Route
                  path={AuthRouteVariants.auth.route}
                  element={<UserAuthPage />}
                />
              </>
            )}
            {isAuthorized && (
              <>
                <Route path={`${NOTESPAGE}/:noteId`} element={<NotesPage />} />
                <Route path={`${EDITORPAGE}/:noteId`} element={<NotesPage />} />
                <Route path={`${TRASHPAGE}/:noteId`} element={<TrashPage />} />
              </>
            )}
            <Route path="*" element={<Navigate to={`/`} />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
