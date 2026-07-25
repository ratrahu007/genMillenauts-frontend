// src/services/authService.js
import api from "./api";

export const sendOtp = async (email) => {
  const response = await api.post(
    "/auth/send-otp",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post(
    "/auth/verify-otp",
    { email, otp },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const registerUser = async (payload) => {
  const response = await api.post(
    "/auth/register",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Don't throw for 4xx (e.g. 409)
      validateStatus: (status) => status < 500,
    }
  );

  return response;
};

export const loginUser = async (email, password) => {
  const response = await api.post(
    "/auth/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateUser = async (token, userData) => {
  const response = await api.put(
    "/users/me",
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