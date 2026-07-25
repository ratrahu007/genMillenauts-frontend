// src/services/bookingService.js
import api from "./api";

export const bookSlot = async (therapistId, slotId, token) => {
  const response = await api.post(
    `/booking/create`,
    { therapistId, slotId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // must contain bookingId
};

export const mockPayment = async (bookingId, token) => {
  const response = await api.post(
    `/payment/mock-pay`,
    { bookingId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserBookings = async (token) => {
  const response = await api.get(`/booking/user/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // The API for user bookings might be returning a single object or an array.
  // The dashboard expects an array, so we ensure it's always an array.
  if (response.data && !Array.isArray(response.data)) {
    return [response.data];
  }
  return response.data;
};

export const getBookingById = async (token, bookingId) => {
  const response = await api.get(`/booking/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTherapistBookings = async (token) => {
  const response = await api.get(`/booking/therapist/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
