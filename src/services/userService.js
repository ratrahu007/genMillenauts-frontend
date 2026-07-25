// src/services/userService.js
import api from "./api";

export const getMyProfile = async (token) => {
  const response = await api.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateUserProfile = async (token, userData) => {
  const response = await api.put(`/users/me`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addAlertContact = async (token, contactData) => {
  const response = await api.post(`/users/me/alerts`, contactData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAlertContacts = async (token) => {
  const response = await api.get(`/users/me/alerts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAlertContactById = async (token, id) => {
  const response = await api.get(`/users/me/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAlertContact = async (token, id) => {
  const response = await api.delete(`/users/me/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
