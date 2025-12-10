import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTherapistBookings as getTherapistBookingsService } from "../../services/bookingService";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchTherapistBookings = createAsyncThunk(
  "bookings/fetchTherapistBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await getTherapistBookingsService(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapistBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTherapistBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchTherapistBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectBookings = (state) => state.bookings.bookings;

export default bookingSlice.reducer;
