import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'services/api';
import { useSearchParams } from 'react-router-dom';
import css from './MoviePage.module.css';

function MoviePage() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query?.trim()) return;
    const fetchTrends = async query => {
      try {
        setIsLoading(true);
        const receivedFilms = await getMoviesByQuery(query);
        setFilms(receivedFilms);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends(query);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: e.currentTarget.search.value });
    e.target.reset();
  };

  return (
    <div>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      <form className={css.formStyle} onSubmit={handleSubmit}>
        <input
          className={css.inputStyle}
          name="search"
          type="text"
          autoComplete="off"
          placeholder="Search movies"
        />
        <button className={css.buttonStyle} type="submit">
          Search
        </button>
      </form>
      <MovieList moviesRoaster={films} />
    </div>
  );
}

export default MoviePage;
