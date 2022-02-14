import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogging: false,
  currentUser: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogging = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLogging = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
      state.isLogging = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    },
    getInfoUser: (state, action) => {},
    getInfoUseSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    getInfoUseFailed: (state, action) => {
      state.currentUser = null;
    },
  },
});
const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
export default authReducer;
