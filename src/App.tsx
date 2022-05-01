import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  AUTHPAGE,
  HOMEPAGE,
  NOTESPAGE,
  TRASHPAGE,
  EDITORPAGE,
} from './constants/routes';
import Layout from './components/UI/Layout/Layout';
import { AuthPage, HomePage, NotesPage, TrashPage } from './pages/shared-pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/*if user is not authorized*/}
      {!isLoggedIn && (
        <Routes>
          <Route path={HOMEPAGE} element={<HomePage />} />
          <Route path={AUTHPAGE} element={<AuthPage />} />
        </Routes>
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
