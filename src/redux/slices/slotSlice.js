import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  generateSlots as generateSlotsService,
  fetchSlots as fetchSlotsService,
} from "../../services/slotService";

export const generateSlots = createAsyncThunk(
  "slots/generate",
  async (slotData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await generateSlotsService(token, slotData);
      dispatch(fetchSlots()); // Refetch slots after creating new ones
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSlots = createAsyncThunk(
  "slots/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      console.log("Fetching slots with token:", token); // For debugging
      const response = await fetchSlotsService(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const slotSlice = createSlice({
  name: "slots",
  initialState: {
    slots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSlots.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(generateSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slotSlice.reducer;

