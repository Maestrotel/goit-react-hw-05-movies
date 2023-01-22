import Loader from 'components/Loader/Loader';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { getFilmDetails } from 'services/api';

const CastPage = lazy(() => import('pages/CastPage/CastPage'));
const ReviewsPage = lazy(() => import('pages/ReviewsPage/ReviewsPage'));

function DetailsMoviePage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    const fetchFilmDetails = async id => {
      try {
        setIsLoading(true);
        const trending = await getFilmDetails(id);
        setMovieInfo(trending);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmDetails(movieId);
  }, [movieId]);

  return (
    <div>
      <Link to={location?.state?.from ?? '/'}>Go Back</Link>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      <div>
        {movieInfo && (
          <div>
            <div>
              <img
                src={
                  movieInfo?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`
                    : 'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'
                }
                alt={movieInfo?.title}
              />
            </div>
            <div>
              <h1>
                {movieInfo?.title} ({movieInfo?.release_date.slice(0, 4)})
              </h1>
              <p>User Score: {movieInfo?.vote_average}</p>
              <h2>Overview</h2>
              <p>{movieInfo?.overview}</p>
              <h2>Genres</h2>
              <ul>
                {movieInfo?.genres?.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
        )}
        <h2>Additional information</h2>
        <Link state={{ from: location?.state?.from ?? '/' }} to="cast">
          Cast
        </Link>
        <Link state={{ from: location?.state?.from ?? '/' }} to="reviews">
          Reviews
        </Link>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<CastPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default DetailsMoviePage;
