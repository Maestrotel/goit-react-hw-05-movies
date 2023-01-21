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
        movieCast?.map(({ id, name, photo }) => {
          return (
            <li key={id}>
              <img src={photo} alt={name} />
            </li>
          );
        })}
    </>
  );
}

export default CastPage;
