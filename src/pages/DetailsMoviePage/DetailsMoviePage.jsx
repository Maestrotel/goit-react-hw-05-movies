import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmDetails } from 'services/api';

function DetailsMoviePage() {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);

  const { infoId } = useParams();

  useEffect(() => {
    const fetchDetails = async infoId => {
      try {
        setIsLoading(true);
        const receivedDetails = await getFilmDetails(infoId);
        setDetails(receivedDetails);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails(infoId);
  }, [infoId]);

  const { poster_path, title, vote_average, overview, release_date, genres } =
    movieInfo;

  return (
    <div>
      {/* {loading && <Loading />} */}
      <div>
        {!movieInfo && (
          <div>
            <div>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'
                }
                alt={title}
              />
            </div>
            <div>
              <h1>
                {title} ({release_date.slice(0, 4)})
              </h1>
              <p>User Score: {vote_average}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <ul>
                {genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
        )}
        {/* <div>
          <h2>Additional information</h2>
          <Link className= to="reviews">
            Cast
          </Link>
          <Link className={s.moreInfoLink} to="cast">
            Reviews
          </Link>
            <Routes>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Routes>
        </div> */}
      </div>
    </div>
  );
}

export default DetailsMoviePage;
