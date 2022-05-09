import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocationIndicator } from './hooks/use-locationIndicator';
import { useAppSelector, useAppDispatch } from './hooks';

import { selectNotification, selectIsloggedIn, setToken } from './store';
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
  const isLoggedIn = useAppSelector(selectIsloggedIn);
  const notification = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const location = useLocationIndicator();

  // presist login
  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      dispatch(setToken({ token: authToken }));
    }
  }, []);

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
          <Route path='*' element={<Navigate to={`/`} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
