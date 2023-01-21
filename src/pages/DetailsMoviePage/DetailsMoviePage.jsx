import Loader from 'components/Loader/Loader';
import CastPage from 'pages/CastPage/CastPage';
import ReviewsPage from 'pages/ReviewsPage/ReviewsPage';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { getFilmDetails } from 'services/api';

function DetailsMoviePage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

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
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Routes>
          <Route path="cast" element={<CastPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default DetailsMoviePage;
