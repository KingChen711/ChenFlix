import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListSubheader, Divider } from '@mui/material';
import { selectTheme } from '../features/themeSlice';
import blueLogo from '../assets/logo/blue-logo.png';
import redLogo from '../assets/logo/red-logo.png';
import { useGetGenresQuery } from '../services/TMDB';
import {
  changeGenreOrCategoryName,
  changeSearchQuery,
  goToPage,
} from '../features/genreOrCategorySlice';
import GenreList from './GenreList';

const SideBar = () => {
  const theme = useSelector(selectTheme);
  const { data } = useGetGenresQuery();
  const dispatch = useDispatch();
  const categories = [
    {
      name: 'Popular',
      id: 'popular',
    },
    {
      name: 'Top Rated',
      id: 'top_rated',
    },
    {
      name: 'Upcoming',
      id: 'upcoming',
    },
  ];

  return (
    <div
      style={{ width: '240px' }}
      className="hidden md:block md:max-h-screen md:overflow-y-auto"
    >
      <Link
        to="/"
        style={{
          height: '112px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {
          dispatch(goToPage('first'));
          dispatch(changeSearchQuery(''));
          dispatch(changeGenreOrCategoryName('popular'));
        }}
      >
        <img
          alt="logo"
          src={theme === 'light' ? blueLogo : redLogo}
          style={{ width: '176px' }}
        />
      </Link>
      <Divider />
      <CustomList nameList="Categories" data={categories} theme={theme} />
      <Divider />
      <CustomList nameList="Genres" data={data?.genres} theme={theme} />
    </div>
  );
};

export default SideBar;

const CustomList = ({ nameList, data }) => (
  <List>
    <ListSubheader>{nameList}</ListSubheader>
    <GenreList data={data} />
  </List>
);
