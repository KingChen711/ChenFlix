/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isAuthenticated: false,
  sessionId: '',
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('account_id', action.payload.id);
    },
    logOutUser: () => {
      localStorage.removeItem('request_token');
      localStorage.removeItem('session_id');
      localStorage.removeItem('account_id');
      return initialState;
    },
  },
});

export const { setUser, logOutUser } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
