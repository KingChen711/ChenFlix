import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSimilarMoviesQuery } from '../services/TMDB';
import { MovieList, MovieDetailInformation } from '../components';

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSimilarMoviesQuery(id);

  return (
    <div className="flex flex-col items-stretch px-2 mt-2 md:px-8 md:mt-8">
      <MovieDetailInformation />
      <Typography
        sx={{ fontSize: { xs: '28px', md: '48px' } }}
        className="text-center font-medium mt-12"
      >
        You might also like
      </Typography>
      {isFetching ? (
        <Box display="flex " justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <MovieList movies={data?.results} />
      )}
    </div>
  );
};

export default MovieDetail;
