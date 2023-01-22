import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/api';

function ReviewsPage() {
  const [movieReviews, setMovieRexiews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchFilmReviews = async id => {
      try {
        setIsLoading(true);
        const trending = await getReviews(id);
        setMovieRexiews(trending);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmReviews(movieId);
  }, [movieId]);

  console.log(movieReviews);

  return (
    <>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      {Array.isArray(movieReviews) &&
        movieReviews?.map(f => {
          return (
            <li key={f.id}>
              <h3>{f.author}</h3>
              <p>{f.content}</p>
            </li>
          );
        })}
    </>
  );
}

export default ReviewsPage;
