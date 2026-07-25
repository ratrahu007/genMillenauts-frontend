import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getTherapistBookings as getTherapistBookingsService,
    getUserBookings as getUserBookingsService
} from "../../services/bookingService";

const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

// Data transformation function
const transformBookingData = (data) => {
    if (!Array.isArray(data)) {
        console.error("Booking data is not an array:", data);
        return [];
    }
    return data.map(booking => ({
        bookingId: booking.bookingId,
        userName: booking.userName,
        therapistName: booking.therapistName,
        therapistSpeciality: booking.therapistSpeciality,
        slotDate: booking.slotDate,
        slotTime: booking.slotTime,
        jitsiUrl: booking.jitsiUrl,
        status: booking.status,
    }));
};


export const fetchTherapistBookings = createAsyncThunk(
    "bookings/fetchTherapistBookings",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await getTherapistBookingsService(token);
            return transformBookingData(response);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    "bookings/fetchUserBookings",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await getUserBookingsService(token);
            return transformBookingData(response);
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
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectBookings = (state) => state.bookings.bookings;

export default bookingSlice.reducer;
