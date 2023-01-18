import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '4f78e0fa15d03d6a74908fc8e459b884';

const filmsAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: KEY,
    language: 'en-US',
    include_adult: false,
  },
});

export const getTrendingMovies = async () => {
  const trending = await filmsAPI.get('/trending/movie/week');
  return trending.data.results;
};

export const getMovies = async query => {
  const search = await filmsAPI.get('/search/movie', {
    params: { query },
  });
  console.log(search.data.results);
  return search.data.results;
};

export const getInfo = async id => {
  const information = await filmsAPI.get(`/movies/${id}`);
  console.log(information.data.results);
  return information.data.results;
};

// export const getCast = async id => {
//   const credits = await filmsAPI.get(`/movie/${id}/credits`);
//   return credits.data;
// };

// export const getReviews = async id => {
//   const reviews = await filmsAPI.get(`/movie/${id}/reviews`);
//   return reviews.data;
// };
