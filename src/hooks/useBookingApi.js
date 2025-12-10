// src/hooks/useBookingApi.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapistBookings } from '../redux/slices/bookingSlice';
import { useCallback } from 'react';

export const useBookingApi = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  const getBookings = useCallback(() => {
    dispatch(fetchTherapistBookings());
  }, [dispatch]);

  return { bookings, loading, error, getBookings };
};
