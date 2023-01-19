import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovieDetail: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos&api_key=${tmdbApiKey}`,
    }),
    getSimilarMovies: builder.query({
      query: (id) => `movie/${id}/similar?api_key=${tmdbApiKey}&page=1`,
    }),
    getActorDetail: builder.query({
      query: (actorId) => `person/${actorId}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActor: builder.query({
      query: (castId) => `discover/movie?with_cast=${castId}&page=1&api_key=${tmdbApiKey}`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `movie/${id}/credits?api_key=${tmdbApiKey}`,
    }),
    getList: builder.query({
      query: ({ listName, userId, sessionId }) => `account/${userId}/${listName}/movies?api_key=${tmdbApiKey}&session_id=${sessionId}&page=1`,
    }),
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        // search movies
        if (searchQuery && searchQuery !== '') {
          return `search/movie?&api_key=${tmdbApiKey}&page=${page}&query=${searchQuery}`;
        }

        // get movies by category
        if (genreOrCategoryName && typeof genreOrCategoryName === 'string') {
          return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by genre
        if (genreOrCategoryName && typeof genreOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreOrCategoryName}&api_key=${tmdbApiKey}&page=${page}`;
        }

        // default get popular movie
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailQuery,
  useGetSimilarMoviesQuery,
  useGetMovieCreditsQuery,
  useGetMoviesByActorQuery,
  useGetActorDetailQuery,
  useGetListQuery,
} = tmdbApi;
