// import CastPage from 'pages/CastPage/CastPage';
// import ReviewsPage from 'pages/ReviewsPage/ReviewsPage';
import { Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import css from '../components/App.module.css';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const MoviePage = lazy(() => import('pages/MoviePage/MoviePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const DetailsMoviePage = lazy(() =>
  import('pages/DetailsMoviePage/DetailsMoviePage')
);

const App = () => {
  return (
    <>
      <header className={css.Header}>
        <nav className={css.NavPart}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.NavLink)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? css.active : css.NavLink)}
          >
            Movies
          </NavLink>
        </nav>
      </header>
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/movies/:movieId/*" element={<DetailsMoviePage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
