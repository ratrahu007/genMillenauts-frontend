// src/services/therapistService.js
import axios from "axios";

const API_URL = " http://localhost:8080/api/therapists"; // Base URL for therapist endpoints

/**
 * Sends an OTP to the therapist's email or mobile.
 * @param {{ email: string, mobile: string }} payload - The therapist's contact details.
 * @returns {Promise<any>} The response from the API.
 */
export const sendTherapistOtp = async (payload) => {
  console.log("Request: POST /api/therapists/send-otp", payload);
  const response = await axios.post(`${API_URL}/send-otp`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response: POST /api/therapists/send-otp", response.data);
  return response.data;
};

/**
 * Verifies the OTP sent to the therapist.
 * @param {{ emailOrMobile: string, otp: string }} payload - The OTP and contact info.
 * @returns {Promise<any>} The response from the API.
 */
export const verifyTherapistOtp = async (payload) => {
  console.log("Request: POST /api/therapists/verify-otp", payload);
  const response = await axios.post(`${API_URL}/verify-otp`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response: POST /api/therapists/verify-otp", response.data);
  return response.data;
};

/**
 * Registers a new therapist.
 * @param {object} payload - The therapist's registration details.
 * @returns {Promise<any>} The response from the API.
 */
export const registerTherapist = async (payload) => {
  console.log("Request: POST /api/therapists/register", payload);
  const response = await axios.post(`${API_URL}/register`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response: POST /api/therapists/register", response.data);
  return response.data;
};

export const loginTherapist = async (payload) => {
  console.log("Request: POST /api/therapists/login", payload);
  const response = await axios.post(`${API_URL}/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response: POST /api/therapists/login", response.data);
  return response.data;
};

