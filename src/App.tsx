import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useInitAppAuth } from "modules/auth/data/remote";
import { Layout, Notification } from "./components";
import { DefaultSpinner } from "./components/UI/Spinners/DefaultSpinner";
import {
  HOMEPAGE,
  NOTESPAGE,
  TRASHPAGE,
  EDITORPAGE,
  DOWNLOADPAGE,
} from "utils/constants";
import { AuthRouteVariants } from "constants/routeVariants";

const UserAuthPage = React.lazy(
  () => import("./modules/auth/presentation/pages/UserAuth/UserAuth"),
);
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotesPage = React.lazy(() => import("./modules/notes/pages/NotesPage"));
const TrashPage = React.lazy(() => import("./modules/notes/pages/TrashPage"));
const DownloadPage = React.lazy(
  () => import("./modules/AuthFree/presentation/pages/DownloadPage"),
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
