import React from 'react';
import { CssBaseline, Stack } from '@mui/material';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { NavBar } from './components/index';
import { selectTheme } from './features/themeSlice';
import { lightTheme, darkTheme } from './utils/theme';
import SideBar from './components/SideBar';
import { ActorDetail, MovieDetail, Movies, Profile } from './pages';

const App = () => {
  const theme = useSelector(selectTheme);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Stack direction="row">
          <SideBar />
          <div className="flex-1 max-h-screen overflow-y-auto">
            <NavBar />
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/actor/:id" element={<ActorDetail />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </div>
        </Stack>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
