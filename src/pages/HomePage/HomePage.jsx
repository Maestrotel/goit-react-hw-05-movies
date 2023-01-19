// import Loading from 'components/Loading/Loading';

import MovieList from 'components/MovieList/MovieList';

import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';

function HomePage() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setIsLoading(true);
        const receivedTrends = await getTrendingMovies();
        setTrends(receivedTrends);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  // const [loading, setLoading] = useState(false);
  return (
    // { loading && <Loading />}
    <div>
      <div>
        <h1>Trending today</h1>
        <MovieList movies={trends} />
      </div>
    </div>
  );
}

export default HomePage;
