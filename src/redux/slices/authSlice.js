import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser as updateUserService } from "../../services/authService";

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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await updateUserService(token, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      const savedAuth = JSON.parse(localStorage.getItem("auth"));
      savedAuth.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(savedAuth));
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        const savedAuth = JSON.parse(localStorage.getItem("auth"));
        savedAuth.user = action.payload;
        localStorage.setItem("auth", JSON.stringify(savedAuth));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  startLoading,
  resetLoading,
  authSuccess,
  setError,
  logout,
  updateUserSuccess,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
