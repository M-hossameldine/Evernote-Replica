import { Routes, Route } from 'react-router-dom';

import Layout from './components/UI/Layout/Layout';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/notes' element={<NotesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
