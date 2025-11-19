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
