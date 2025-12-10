// src/services/slotService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/slots";

export const generateSlots = async (token, slotData) => {
  const response = await axios.post(`${BASE_URL}/generate`, slotData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchSlots = async (token) => {
  const response = await axios.post(`${BASE_URL}/fetch`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSlotsByTherapistId = async (therapistId) => {
  const response = await axios.post(`${BASE_URL}/public/fetch`, {
    therapistId,
  });
  return response.data;
};

export const fetchAllPublicSlots = async () => {
  const response = await axios.post(`${BASE_URL}/public/fetch`);
  return response.data;
};
