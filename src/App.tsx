import { Routes, Route, Navigate } from "react-router-dom";

import {
  useAppSelector,
  useAppDispatch,
  useTokenData,
  useLocationIndicator,
} from "hooks";

import { selectNotification, selectIsLoggedIn } from "store";
import { Layout, Notification } from "./components";
import {
  AUTHPAGE,
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

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // Todo: handle notifications
  const notification = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const location = useLocationIndicator();
  const authState = useAppSelector((state) => state.auth);

  // preserve login using token stored data in the local storage
  useTokenData();

  return (
    <>
      <Notification />

      <Layout>
        <Routes>
          <Route path={HOMEPAGE} element={<HomePage />} />
          {/*if user is not authorized*/}
          {!isLoggedIn && (
            <>
              <Route path={DOWNLOADPAGE} element={<DownloadPage />} />
              <Route path={`${AUTHPAGE}/login`} element={<AuthPage />} />
              <Route path={`${AUTHPAGE}/register`} element={<AuthPage />} />
            </>
          )}
          {/* if user is authorized*/}
          {isLoggedIn && (
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
