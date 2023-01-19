import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  Stack,
} from '@mui/material';
import {
  Remove as RemoveIcon,
  PlusOne as PlusOneIcon,
  Language as LanguageIcon,
  Movie as MovieIcon,
  Theaters as TheatersIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useGetListQuery, useGetMovieDetailQuery } from '../services/TMDB';

const MovieDetailButtons = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [isMovieWatchList, setIsMovieWatchList] = useState(false);
  const { data, isFetching } = useGetMovieDetailQuery(id);
  const userId = localStorage.getItem('account_id');
  const sessionId = localStorage.getItem('session_id');
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const { data: dataFavoriteMovies } = useGetListQuery({
    listName: 'favorite',
    userId,
    sessionId,
  });
  const { data: dataWatchListMovies } = useGetListQuery({
    listName: 'watchlist',
    userId,
    sessionId,
  });

  useEffect(() => {
    setIsMovieFavorite(
      dataFavoriteMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [dataFavoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchList(
      dataWatchListMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [dataWatchListMovies, data]);

  async function addFavorite() {
    await axios.post(
      `https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorite,
      },
    );
    setIsMovieFavorite((prev) => !prev);
  }

  async function addWatchList() {
    await axios.post(
      `https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${apiKey}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchList,
      },
    );
    setIsMovieWatchList((prev) => !prev);
  }

  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        mt={6}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '4px' }}
        >
          <Button
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            endIcon={<LanguageIcon />}
            rel="noopener noreferrer"
            target="_blank"
            href={data?.homepage}
          >
            website
          </Button>
          <Button
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            endIcon={<MovieIcon />}
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${data?.imdb_id}`}
            target="_blank"
          >
            imdb
          </Button>
          <Button
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            endIcon={<TheatersIcon />}
            rel="noopener noreferrer"
            href="#"
            onClick={() => setOpen(true)}
          >
            trailer
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '4px' }}
        >
          <Button
            onClick={() => addFavorite()}
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            endIcon={
              isMovieFavorite ? (
                <FavoriteIcon sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderIcon />
              )
            }
          >
            {isMovieFavorite ? 'unfavorite' : 'favorite'}
          </Button>
          <Button
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            onClick={() => addWatchList()}
            endIcon={isMovieWatchList ? <RemoveIcon /> : <PlusOneIcon />}
          >
            watch list
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            sx={{ fontSize: { xs: '8px', md: '14px' } }}
            endIcon={<ArrowBackIcon />}
          >
            back
          </Button>
        </ButtonGroup>
      </Stack>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data?.videos?.results?.length > 0 && (
          <div style={{ width: '960px', maxWidth: '80%', aspectRatio: '16/9' }}>
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              url={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
            />
          </div>
        )}
      </Modal>
    </Box>
  );
};
export default MovieDetailButtons;
