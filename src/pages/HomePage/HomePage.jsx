import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';
import css from './HomePage.module.css';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setIsLoading(true);
        const trending = await getTrendingMovies();
        setTrendingMovies(trending);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  return (
    <div>
      <div>
        <h1 className={css.heading}>Trending today</h1>
        {error !== null && <p>Something went wrong {error}</p>}
        {isLoading && <Loader />}
        <MovieList moviesRoaster={trendingMovies} />
      </div>
    </div>
  );
}

export default HomePage;
