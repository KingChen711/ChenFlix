import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToPage,
  selectGenreOrCategory,
} from '../features/genreOrCategorySlice';

const NavPagination = () => {
  const { page } = useSelector(selectGenreOrCategory);
  const dispatch = useDispatch();
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(goToPage('prev'));
        }}
      >
        Prev
      </Button>
      <Typography variant="h4" mx={2}>
        {page}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(goToPage('next'));
        }}
      >
        Next
      </Button>
    </Stack>
  );
};

export default NavPagination;
