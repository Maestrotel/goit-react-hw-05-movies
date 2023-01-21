import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'services/api';

function MoviePage() {
  const [films, setFilms] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchValue.trim() === '') return;
    const fetchTrends = async searchValue => {
      try {
        setIsLoading(true);
        const receivedFilms = await getMoviesByQuery(searchValue);
        setFilms(receivedFilms);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends(searchValue);
  }, [searchValue]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchValue(e.currentTarget.search.value);
    e.target.reset();
  };

  return (
    <div>
      {error !== null && <p>Something went wrong {error}</p>}
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          // value={searchQuery}
          // onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList moviesRoaster={films} />
    </div>
  );
}

export default MoviePage;
