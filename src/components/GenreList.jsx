import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeGenreOrCategoryName,
  changeSearchQuery,
  goToPage,
} from '../features/genreOrCategorySlice';
import { selectTheme } from '../features/themeSlice';
import genresIcon from '../assets/genres/index';

const GenreList = ({ data, direction, overflow }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction && direction === 'row' ? 'row' : 'column',
        width: '100%',
        justifyContent: 'center',
        overflow: overflow && overflow === 'auto' && 'auto',
      }}
    >
      {data?.map(({ id, name }) => (
        <Link key={id} to="/">
          <ListItem
            onClick={() => {
              dispatch(changeGenreOrCategoryName(id));
              dispatch(changeSearchQuery(''));
              dispatch(goToPage('first'));
            }}
            button
          >
            <ListItemIcon sx={{ width: '32px', height: '32px' }}>
              <img
                style={{
                  filter: 'invert(100%)',
                  WebkitFilter: theme === 'dark' && 'invert(100%)',
                }}
                className="object-cover"
                height={30}
                alt="icon"
                src={genresIcon[name.toLowerCase()]}
              />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
};

export default GenreList;
