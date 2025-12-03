// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import stressReducer from "./slices/stressSlice";
import slotReducer from "./slices/slotSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stress: stressReducer,
    slots: slotReducer,
  },
});
