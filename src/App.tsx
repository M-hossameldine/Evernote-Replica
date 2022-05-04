import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocationIndicator } from './hooks/use-locationIndicator';

import { Layout } from './components';
import {
  AUTHPAGE,
  HOMEPAGE,
  NOTESPAGE,
  TRASHPAGE,
  EDITORPAGE,
  DOWNLOADPAGE,
} from './constants/routes';
import {
  AuthPage,
  HomePage,
  NotesPage,
  TrashPage,
  DownloadPage,
} from './pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocationIndicator();

  return (
    <>
      {/*if user is not authorized*/}
      {!isLoggedIn && location.isInCurrentPath(AUTHPAGE) && (
        <Routes>
          <Route path={`${AUTHPAGE}/login`} element={<AuthPage />} />
          <Route path={`${AUTHPAGE}/register`} element={<AuthPage />} />
        </Routes>
      )}

      {!isLoggedIn && !location.isInCurrentPath(AUTHPAGE) && (
        <>
          <Layout>
            <Routes>
              <Route path={HOMEPAGE} element={<HomePage />} />
              <Route path={DOWNLOADPAGE} element={<DownloadPage />} />
            </Routes>
          </Layout>
        </>
      )}

      {/* if user is authorized, render the layout */}
      {isLoggedIn && (
        <Layout>
          <Routes>
            <Route path={HOMEPAGE} element={<HomePage />} />
            <Route path={`${NOTESPAGE}/:noteId`} element={<NotesPage />} />
            <Route path={`${EDITORPAGE}/:noteId`} element={<NotesPage />} />
            <Route path={`${TRASHPAGE}/:noteId`} element={<TrashPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
