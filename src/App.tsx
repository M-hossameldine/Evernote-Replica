import { Routes, Route } from 'react-router-dom';

import { HOMEPAGE, NOTESPAGE } from './constants/routes';
import Layout from './components/UI/Layout/Layout';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={HOMEPAGE} element={<HomePage />} />
        <Route path={NOTESPAGE} element={<NotesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
