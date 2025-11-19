// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, role: null, user: null };

const initialState = {
  user: savedAuth.user,
  token: savedAuth.token,
  role: savedAuth.role,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
    authSuccess: (state, action) => {
      const { token, role, user } = action.payload;
      state.loading = false;
      state.token = token;
      state.role = role;
      state.user = user;
      localStorage.setItem("auth", JSON.stringify({ token, role, user }));
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: () => {
      localStorage.removeItem("auth");
      return {
        user: null,
        token: null,
        role: null,
        loading: false,
        error: null,
      };
    },
  },
});

export const { startLoading, resetLoading, authSuccess, setError, logout } =
  authSlice.actions;

export default authSlice.reducer;
