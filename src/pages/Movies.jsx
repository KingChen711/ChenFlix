import React from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../features/genreOrCategorySlice';
import { useGetMoviesQuery } from '../services/TMDB';
import { MovieList, Banner, NavPagination } from '../components';

const Movies = () => {
  const { genreOrCategoryName, page, searchQuery } = useSelector(
    selectGenreOrCategory,
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.results?.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography>
          No movies match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'An error occurred!';
  }

  return (
    <Stack px={4}>
      <Banner latest={data?.results[0]} />
      <MovieList movies={data?.results} />
      <NavPagination />
    </Stack>
  );
};

export default Movies;
