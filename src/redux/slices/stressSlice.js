import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const analyzeStress = createAsyncThunk(
  "stress/analyze",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await fetch(
        "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/ai/stress/analyze",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to analyze stress");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLatestStress = createAsyncThunk(
  "stress/getLatest",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await fetch(
        "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/ai/stress/latest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch latest stress");
      }
      return {
        stress_level: data.stressIndex,
        mood: data.mood,
        time: data.time,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWeeklyStress = createAsyncThunk(
  "stress/getWeekly",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await fetch(
        "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/ai/stress/weekly",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch weekly stress");
      }
      return data.map(item => ({
        date: item.date,
        avg_stress_level: item.averageStress,
        overallMood: item.overallMood,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stressSlice = createSlice({
  name: "stress",
  initialState: {
    analysis: null,
    latestStress: null,
    weeklyStress: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analyzeStress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeStress.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })
      .addCase(analyzeStress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLatestStress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestStress.fulfilled, (state, action) => {
        state.loading = false;
        state.latestStress = action.payload;
      })
      .addCase(getLatestStress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWeeklyStress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeeklyStress.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStress = action.payload;
      })
      .addCase(getWeeklyStress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stressSlice.reducer;
