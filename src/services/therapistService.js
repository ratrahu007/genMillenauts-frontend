// src/services/therapistService.js
import axios from "axios";

const API_URL = "https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/therapists"; // Base URL for therapist endpoints

/**
 * Sends an OTP to the therapist's email or mobile.
 * @param {{ email: string, mobile: string }} payload - The therapist's contact details.
 * @returns {Promise<any>} The response from the API.
 */
export const sendTherapistOtp = async (payload) => {
  const response = await axios.post(`${API_URL}/send-otp`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

/**
 * Verifies the OTP sent to the therapist.
 * @param {{ emailOrMobile: string, otp: string }} payload - The OTP and contact info.
 * @returns {Promise<any>} The response from the API.
 */
export const verifyTherapistOtp = async (payload) => {
  const response = await axios.post(`${API_URL}/verify-otp`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

/**
 * Registers a new therapist.
 * @param {object} payload - The therapist's registration details.
 * @returns {Promise<any>} The response from the API.
 */
export const registerTherapist = async (payload) => {
  const response = await axios.post(`${API_URL}/register`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const loginTherapist = async (payload) => {
  const response = await axios.post(`${API_URL}/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getTherapistProfile = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllTherapists = async () => {
  const response = await axios.get(`${API_URL}/public`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
