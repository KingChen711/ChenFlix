import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetActorDetailQuery } from '../services/TMDB';

const ActorDetailInformation = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetActorDetailQuery(id);
  const navigate = useNavigate();

  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  function customFormatDay() {
    const date = new Date(data?.birthday);
    return date.toDateString().substr(4);
  }
  return (
    <div className="flex flex-col 2xl:flex-row justify-between">
      <div className="2xl:w-1/3 2xl:mx-0 mt-3 mb-8 2xl:my-0">
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
          className="object-cover rounded-xl shadow-white shadow-lg mx-auto"
        />
      </div>

      <div className="flex flex-col 2xl:w-7/12 mx-auto max-w-full justify-between items-center">
        <div>
          <Typography className="text-3xl md:text-5xl">{data?.name}</Typography>
          <Typography className="text-lg md:text-2xl mt-6">
            Born: {customFormatDay()}
          </Typography>
          <Typography variant="p" my={2}>
            {data?.biography}
          </Typography>
        </div>
        <div className="flex justify-around mt-6 w-full">
          <Button
            variant="outlined"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
            target="_blank"
            rel="noreferrer"
          >
            imdb
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
            back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailInformation;
