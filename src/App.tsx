import { Routes, Route, Navigate } from "react-router-dom";

import { useInitAppAuth } from "modules/auth/data/remote";
import { Layout, Notification } from "./components";
import {
  HOMEPAGE,
  NOTESPAGE,
  TRASHPAGE,
  EDITORPAGE,
  DOWNLOADPAGE,
} from "utils/constants";
import {
  AuthPage,
  HomePage,
  NotesPage,
  TrashPage,
  DownloadPage,
} from "./pages";

import { AuthMode } from "constants/AppEnums/AuthEnums";
import { AuthRouteVariants } from "constants/routeVariants";

function App() {
  const { isAuthorized } = useInitAppAuth();

  return (
    <>
      <Notification />

      <Layout>
        <Routes>
          <Route path={HOMEPAGE} element={<HomePage />} />

          {!isAuthorized && (
            <>
              <Route path={DOWNLOADPAGE} element={<DownloadPage />} />
              <Route
                path={AuthRouteVariants.auth.pathname(AuthMode.LOGIN)}
                element={<AuthPage />}
              />
              <Route
                path={AuthRouteVariants.auth.pathname(AuthMode.REGISTER)}
                element={<AuthPage />}
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
      </Layout>
    </>
  );
}

export default App;
