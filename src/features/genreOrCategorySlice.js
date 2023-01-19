/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreOrCategoryName: 'popular',
  page: 1,
  searchQuery: '',
};
export const genreOrCategorySlice = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    changeGenreOrCategoryName: (state, action) => {
      state.genreOrCategoryName = action.payload;
    },
    changeSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    goToPage: (state, action) => {
      const type = action.payload;
      if (type === 'next') {
        state.page += 1;
      } else if (type === 'prev') {
        state.page = state.page > 1 ? state.page - 1 : state.page;
      } else if (type === 'first') {
        state.page = 1;
      }
    },
  },
});

export const { changeGenreOrCategoryName, changeSearchQuery, goToPage } = genreOrCategorySlice.actions;

export const selectGenreOrCategory = (state) => state.genreOrCategory;

export default genreOrCategorySlice.reducer;
