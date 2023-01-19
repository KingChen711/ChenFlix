import { CircularProgress, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOutUser, selectAuth } from '../features/authSlice';
import { useGetListQuery } from '../services/TMDB';
import { MovieList } from '../components';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { sessionId } = useSelector(selectAuth);
  const { data: dataFavoriteMovies, isFetching: isFetchingFavoriteMovies } = useGetListQuery({ listName: 'favorite', userId, sessionId });
  const { data: dataWatchListMovies, isFetching: isFetchingWatchListMovies } = useGetListQuery({ listName: 'watchlist', userId, sessionId });

  return (
    <div className="px-8 pt-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h3">My Profile</Typography>
        <Button
          onClick={() => {
            dispatch(logOutUser());
            navigate('/');
          }}
          variant="outlined"
          endIcon={<LogoutIcon />}
        >
          log out
        </Button>
      </div>

      {dataFavoriteMovies?.results?.length !== 0 && (
        <div className="mb-6">
          <Typography variant="h5">Favorite Movies:</Typography>
          {isFetchingFavoriteMovies ? (
            <Box display="flex " justifyContent="center">
              <CircularProgress size="4rem" />
            </Box>
          ) : (
            <MovieList movies={dataFavoriteMovies?.results} />
          )}
        </div>
      )}

      {dataWatchListMovies?.results?.length !== 0 && (
        <div>
          <Typography variant="h5">Watch List Movies:</Typography>
          {isFetchingWatchListMovies ? (
            <Box display="flex " justifyContent="center">
              <CircularProgress size="4rem" />
            </Box>
          ) : (
            <MovieList movies={dataWatchListMovies?.results} />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
