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
  const { data } = await filmsAPI.get('/trending/movie/week');
  return data.results;
};

export const getMoviesByQuery = async query => {
  const { data } = await filmsAPI.get('/search/movie', {
    params: { query },
  });
  return data.results;
};

export const getFilmDetails = async id => {
  const { data } = await filmsAPI.get(`/movie/${id}`);
  return data;
};

export const getCast = async id => {
  const { data } = await filmsAPI.get(`/movie/${id}/credits`);
  console.log(data);
  return data.cast;
};

// export const getReviews = async id => {
//   const { data } = await filmsAPI.get(`/movie/${id}/reviews`);
//   return data;
// };
