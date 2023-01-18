import React from 'react';
import { Link } from 'react-router-dom';

function AppList({ movies }) {
  return (
    <ul>
      {movies.map(f => {
        return (
          <Link key={f.id} className="moviesStyle" to={`/movie/${f.id}`}>
            <h2>{f.name || f.title}</h2>
          </Link>
        );
      })}
    </ul>
  );
}

export default AppList;
