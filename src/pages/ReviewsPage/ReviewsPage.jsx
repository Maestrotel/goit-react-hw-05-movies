import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/api';

function ReviewsPage() {
  const [movieReviews, setMovieRexiews] = useState([]);
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

  // console.log(movieReviews.length);

  return (
    <>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      <ul>
        {Array.isArray(movieReviews) &&
          movieReviews?.map(f => {
            return (
              <li key={f.id}>
                <h3>{f.author}</h3>
                <p>{f.content}</p>
              </li>
            );
          })}
      </ul>
      {movieReviews.length === 0 && <p>No reviews for this movie</p>}
    </>
  );
}

//          <p>No reviews for this movie</p>

export default ReviewsPage;
