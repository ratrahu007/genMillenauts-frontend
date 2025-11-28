// src/services/userService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

export const getMyProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateUserProfile = async (token, userData) => {
  const response = await axios.put(`${BASE_URL}/me`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addAlertContact = async (token, contactData) => {
  const response = await axios.post(`${BASE_URL}/me/alerts`, contactData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAlertContacts = async (token) => {
  const response = await axios.get(`${BASE_URL}/me/alerts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAlertContactById = async (token, id) => {
  const response = await axios.get(`${BASE_URL}/me/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAlertContact = async (token, id) => {
  const response = await axios.delete(`${BASE_URL}/me/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
