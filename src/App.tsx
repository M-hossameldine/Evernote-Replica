import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocationIndicator } from './hooks/use-locationIndicator';
import { useAppSelector } from './hooks';

import { selectNotification, selectIsloggedIn } from './store/shared-store';
import { Layout, Notification } from './components';
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useAppSelector(selectIsloggedIn);
  const notification = useAppSelector(selectNotification);
  const location = useLocationIndicator();

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}

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
          <Route path='*' element={<Navigate to={`/`} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
