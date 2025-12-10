// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import stressReducer from "./slices/stressSlice";
import slotReducer from "./slices/slotSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stress: stressReducer,
    slots: slotReducer,
    bookings: bookingReducer,
  },
});
