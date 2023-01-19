import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMoviesByActorQuery } from '../services/TMDB';
import { MovieList, ActorDetailInformation } from '../components';

const ActorDetail = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetMoviesByActorQuery(id);

  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return (
    <div className="flex flex-col items-stretch px-8 mt-2 md:px-8 md:mt-8">
      <ActorDetailInformation />
      <Typography
        sx={{ fontSize: { xs: '28px', md: '48px' } }}
        className="text-center font-medium mt-12"
      >
        Movies
      </Typography>
      <MovieList movies={data?.results} />
    </div>
  );
};

export default ActorDetail;
