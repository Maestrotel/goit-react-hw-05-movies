import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from 'services/api';

function CastPage() {
  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchFilmCast = async id => {
      try {
        setIsLoading(true);
        const trending = await getCast(id);
        setMovieCast(trending);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmCast(movieId);
  }, [movieId]);

  return (
    <>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      {Array.isArray(movieCast) &&
        movieCast?.map(({ id, name, profile_path }) => {
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
              />
            </li>
          );
        })}
    </>
  );
}

export default CastPage;
