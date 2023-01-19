import { Box, CircularProgress, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
} from '../services/TMDB';
import GenreList from './GenreList';
import MovieDetailButtons from './MovieDetailButtons';

const MovieDetailInformation = () => {
  const { id } = useParams();
  const { data: dataMovieDetail, isFetching } = useGetMovieDetailQuery(id);
  const movieCredits = useGetMovieCreditsQuery(id);

  const releaseYear = dataMovieDetail?.release_date?.split('-')[0];
  const rate = dataMovieDetail?.vote_average;

  const customFormatDay = () => {
    const date = new Date(dataMovieDetail?.release_date);
    return date.toDateString().substr(4);
  };

  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return (
    <div className="flex flex-col 2xl:flex-row justify-between max-w-[95%] mx-auto">
      <div className="2xl:w-1/3 2xl:mx-0 mt-3 mb-8 2xl:my-0">
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500${dataMovieDetail?.poster_path}`}
          className="object-cover rounded-xl shadow-white shadow-lg mx-auto"
        />
      </div>

      <div className="flex flex-col justify-start items-center 2xl:w-7/12 mx-auto max-w-full">
        <Typography className="text-center text-3xl md:text-5xl">
          {dataMovieDetail?.original_title} {`(${releaseYear})`}
        </Typography>
        <Typography my={2} className="text-center text-base md:text-2xl">
          {dataMovieDetail?.tagline}
        </Typography>
        <div className="flex flex-col md:flex-row justify-around items-center w-full mb-4">
          <div className="flex items-center">
            <Rating
              precision={0.1}
              name="read-only"
              value={rate / 2}
              readOnly
            />{' '}
            <Typography variant="p" ml={1}>
              {rate}/10
            </Typography>
          </div>
          <Typography className="text-base md:text-xl my-2 md:my-0">
            {dataMovieDetail?.runtime}min / {customFormatDay()} /{' '}
            {dataMovieDetail?.spoken_languages[0].english_name}
          </Typography>
        </div>
        <GenreList
          overflow="auto"
          direction="row"
          data={dataMovieDetail?.genres}
        />
        <div className="mt-4 w-full flex flex-col justify-start items-start">
          <Typography variant="h5">Overview</Typography>
          <Typography variant="p" my={2}>
            {dataMovieDetail?.overview}
          </Typography>
        </div>
        <div className="mt-4 w-full flex flex-col justify-start items-start overflow-x-auto custom-scrollbar">
          <Typography variant="h5">Top Cast</Typography>
          <div className="flex mt-2">
            {movieCredits?.data?.cast.map((item) => (
              <Link
                to={`/actor/${item.id}`}
                key={item.id}
                className="flex flex-col w-28 mx-1"
              >
                <img
                  className="w-28 h-36 object-cover rounded-lg"
                  alt="img_cast"
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                />
                <Typography className="my-1">{item?.name}</Typography>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {item?.character}
                </Typography>
              </Link>
            ))}
          </div>
        </div>
        <MovieDetailButtons />
      </div>
    </div>
  );
};

export default MovieDetailInformation;
