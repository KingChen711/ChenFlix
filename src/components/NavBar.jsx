import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Link,
  Drawer,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Search as SearchIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTheme, changeTheme } from '../features/themeSlice';
import {
  changeSearchQuery,
  goToPage,
  selectGenreOrCategory,
} from '../features/genreOrCategorySlice';
import { createSessionId, fetchToken, moviesApi } from '../utils/fetchToken';
import { selectAuth, setUser } from '../features/authSlice';
import SideBar from './SideBar';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const token = localStorage.getItem('request_token');
  const sessionId = localStorage.getItem('session_id');
  const { isAuthenticated, user } = useSelector(selectAuth);
  const [openNavBar, setOpenNavBar] = useState(false);

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionId) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`,
          );
          dispatch(setUser(userData));
        } else {
          const newSessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${newSessionId}`,
          );
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);

  return (
    <AppBar position="sticky" sx={{ p: 1 }}>
      <Toolbar className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center">
        <IconButton className="md:hidden" onClick={() => setOpenNavBar(true)}>
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(changeTheme());
          }}
        >
          {theme === 'light' ? (
            <Brightness4Icon sx={{ color: 'White' }} />
          ) : (
            <Brightness7Icon sx={{ color: 'White' }} />
          )}
        </IconButton>
        <SearchBar />
        {isAuthenticated ? (
          <Button
            className="flex items-center text-white"
            component={Link}
            onClick={() => {
              navigate(`/profile/${user.id}`);
            }}
          >
            {user?.username}
            <Avatar
              alt="Profile"
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="ml-2"
              sx={{ width: '28px', height: '28px' }}
            />
          </Button>
        ) : (
          <Button
            className="flex items-center text-white"
            onClick={() => fetchToken()}
          >
            Login
            <AccountCircleIcon sx={{ width: '28px', height: '28px', ml: 1 }} />
          </Button>
        )}
        {/* break line */}
        <div className="basis-full h-0 md:hidden" />
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={openNavBar}
        onClose={() => setOpenNavBar(false)}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          overflow: 'scroll',
          height: 'auto',
        }}
      >
        <div onClick={() => setOpenNavBar(false)}>
          <SideBar />
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;

const SearchBar = () => {
  const { searchQuery } = useSelector(selectGenreOrCategory);
  const [searchText, setSearchText] = useState(searchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText !== '') {
      dispatch(changeSearchQuery(searchText));
      dispatch(goToPage('first'));
      navigate('/');
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-center border-b border-b-white order-1 md:order-[0] mx-auto"
    >
      <SearchIcon />
      <input
        onChange={(e) => setSearchText(e.target.value)}
        className="outline-none border-none bg-transparent"
        type="text"
        value={searchText}
      />
    </form>
  );
};
