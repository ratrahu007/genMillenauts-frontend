// src/services/authService.js
import axios from "axios";

const BASE_URL = "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/auth";

export const sendOtp = async (email) => {
  const response = await axios.post(
    `${BASE_URL}/send-otp`,
    { email },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

// ✅ FIXED: Only send { email, otp }
export const verifyOtp = async (email, otp) => {
  const body = { email, otp };

  const response = await axios.post(`${BASE_URL}/verify-otp`, body, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const registerUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/register`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // ✅ This line ensures 4xx (like 409) are NOT treated as exceptions
    validateStatus: (status) => status < 500,
  });

  return response;
};


export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const updateUser = async (token, userData) => {
  const response = await axios.put(
    "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/users/me",
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};