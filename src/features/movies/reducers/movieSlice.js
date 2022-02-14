import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  data: {
    totalPages: 0,
    items: [],
  },
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovie: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    getMovieSuccess: (state, action) => {
      state.isLoading = false;
      state.data.totalPages = action.payload.totalPages || 0;
      state.data.items = action.payload.items || action.payload;
    },
    getMovieFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const movieActions = movieSlice.actions;
export const selectLoading = (state) => state.movies.isLoading;
export const selectError = (state) => state.movies.error;
export const selectData = (state) => state.movies.data;

const movieReducer = movieSlice.reducer;
export default movieReducer;
