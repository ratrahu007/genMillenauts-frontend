import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    provider: "gemini",
  },
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
  },
});

export const { setProvider } = aiSlice.actions;
export default aiSlice.reducer;
