// src/hooks/useBookingApi.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapistBookings, fetchUserBookings } from '../redux/slices/bookingSlice';
import { useCallback } from 'react';

export const useBookingApi = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const { role } = useSelector((state) => state.auth);

  const getBookings = useCallback(() => {
    if (role === 'therapist') {
      dispatch(fetchTherapistBookings());
    } else {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, role]);

  return { bookings, loading, error, getBookings };
};
