// src/services/bookingService.js
import axios from "axios";

const BASE_URL = "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/booking";
const PAYMENT_URL = "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/payment";

export const bookSlot = async (therapistId, slotId, token) => {
  const response = await axios.post(
    `${BASE_URL}/create`,
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
  const response = await axios.post(
    `${PAYMENT_URL}/mock-pay`,
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



export const getBookingById = async (token, bookingId) => {
  const response = await axios.get(`${BASE_URL}/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTherapistBookings = async (token) => {
  const response = await axios.get(`${BASE_URL}/therapist/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
