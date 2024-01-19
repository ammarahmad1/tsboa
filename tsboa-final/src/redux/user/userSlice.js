import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    isLoggedIn: false,
    loading: false,
  };


  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state) => {
        state.loading = true;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      },
      signInFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      updateUserStart: (state) => {
        state.loading = true;
      },
      deleteUserStart: (state) => {
        state.loading = true;
      },
      deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      },
      deleteUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      signOutUserStart: (state) => {
        state.loading = true;
      },
      signOutUserSuccess: (state) => {
        state.currentUser = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      },
      signOutUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    },  
  });
  
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
  } = userSlice.actions;
  
  export default userSlice.reducer;