// src/services/authService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

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
  console.log("VERIFY OTP PAYLOAD:", body);

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