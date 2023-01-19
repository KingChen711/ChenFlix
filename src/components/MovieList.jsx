import { Grid, Grow, Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => (
  <Grid container mt={4}>
    {movies?.map((movie, i) => (
      <MovieItem key={movie.id} i={i} movie={movie} />
    ))}
  </Grid>
);

export default MovieList;

const MovieItem = ({ movie, i }) => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} mb={2}>
    <Grow in key={i} timeout={(i + 1) * 250}>
      <Link
        to={`/movie/${movie.id}`}
        className="flex flex-col justify-center items-center"
      >
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-[200px] h-[300px] rounded-lg mb-2 hover:scale-105"
        />
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            lineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
          className="px-1 text-2xl"
        >
          {movie.original_title}
        </div>
        <Rating
          precision={0.1}
          name="read-only"
          value={movie.vote_average / 2}
          readOnly
        />
      </Link>
    </Grow>
  </Grid>
);
