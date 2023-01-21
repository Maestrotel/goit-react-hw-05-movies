import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';

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
  // const [trends, setTrends] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchTrends = async () => {
  //     try {
  //       setIsLoading(true);
  //       const receivedTrends = await getTrendingMovies();
  //       setTrends(receivedTrends);
  //     } catch (err) {
  //       setError(err.message);
  //       console.log(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchTrends();
  // }, []);

  // const [loading, setLoading] = useState(false);
  return (
    // { loading && <Loading />}
    <div>
      <div>
        <h1>Trending today</h1>
        {error !== null && <p>Something went wrong {error}</p>}
        {isLoading && <Loader />}
        <MovieList moviesRoaster={trendingMovies} />
      </div>
    </div>
  );
}

export default HomePage;
