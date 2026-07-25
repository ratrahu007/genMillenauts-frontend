// src/services/slotService.js
import api from "./api";

export const generateSlots = async (token, slotData) => {
  const response = await api.post(`/slots/generate`, slotData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchSlots = async (token) => {
  const response = await api.post(`/slots/fetch`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSlotsByTherapistId = async (therapistId) => {
  const response = await api.post(`/slots/public/fetch`, {
    therapistId,
  });
  return response.data;
};

export const fetchAllPublicSlots = async () => {
  const response = await api.post(`/slots/public/fetch`);
  return response.data;
};
