import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MovieList({ moviesRoaster }) {
  return (
    <ul>
      {moviesRoaster.map(f => {
        return (
          <Link key={f.id} className="moviesStyle" to={`/movies/${f.id}`}>
            <h2>{f.name || f.title}</h2>
          </Link>
        );
      })}
    </ul>
  );
}

export default MovieList;

MovieList.propTypes = {
  moviesRoaster: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
};
