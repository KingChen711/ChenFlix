import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import themeReducer from '../features/themeSlice';
import genresOrCategoryRenderer from '../features/genreOrCategorySlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    genreOrCategory: genresOrCategoryRenderer,
    auth: authReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
