import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {FC} from 'react';
import './App.css';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
// Importa la nueva página de búsqueda TMDB
import SearchTMDBPage from './pages/SearchTMDBPage';

const App : FC = () => {
  //const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Layout>
      <Routes>

      {/* Página de búsqueda TMDB */}
      <Route path="/search-tmdb" element={<SearchTMDBPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />

      </Routes>
      </Layout>
    </Router>
    </>
  )
}

export default App
