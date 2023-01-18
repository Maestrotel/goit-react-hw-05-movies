import CastPage from 'pages/CastPage/CastPage';
import DetailsMoviePage from 'pages/DetailsMoviePage/DetailsMoviePage';
import HomePage from 'pages/HomePage/HomePage';
import MoviePage from 'pages/MoviePage/MoviePage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ReviewPage from 'pages/ReviewPage/ReviewPage';
import { Routes, Route, NavLink } from 'react-router-dom';
import css from '../components/App.module.css';

export const App = () => {
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/movies/:movieId" element={<DetailsMoviePage />}>
            <Route path="cast" element={<CastPage />} />
            <Route path="reviews" element={<ReviewPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
