import { Routes, Route } from 'react-router-dom';

import { HOMEPAGE, NOTESPAGE, TRASHPAGE, EDITORPAGE } from './constants/routes';
import Layout from './components/UI/Layout/Layout';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/HomePage';
import TrashPage from './pages/TrashPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={HOMEPAGE} element={<HomePage />} />
        <Route path={`${NOTESPAGE}/:noteId`} element={<NotesPage />} />
        <Route path={`${EDITORPAGE}/:noteId`} element={<NotesPage />} />
        <Route path={`${TRASHPAGE}/:noteId`} element={<TrashPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
