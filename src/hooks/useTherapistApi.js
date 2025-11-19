// src/hooks/useTherapistApi.js
import { useState } from "react";
import { toast } from "sonner";
import {
  sendTherapistOtp,
  verifyTherapistOtp,
  registerTherapist,
} from "../services/therapistService";

/**
 * Custom hook to interact with the therapist authentication API.
 * It abstracts away the API calling logic, loading states, and notifications.
 *
 * @returns {{
 *   loading: boolean,
 *   sendOtp: (contact: { email: string, mobile: string }) => Promise<any>,
 *   verifyOtp: (data: { emailOrMobile: string, otp: string }) => Promise<any>,
 *   register: (data: object) => Promise<any>
 * }}
 */
export const useTherapistApi = () => {
  // useState hook to manage the loading state for all API calls from this hook.
  // This helps in providing visual feedback (e.g., disabling a button) to the user.
  const [loading, setLoading] = useState(false);

  /**
   * Handles the API call to send an OTP.
   * @param {{ email: string, mobile: string }} contact - Therapist's contact info.
   */
  const sendOtp = async (contact) => {
    setLoading(true);
    console.log("useTherapistApi: Sending OTP...", contact);
    try {
      const response = await sendTherapistOtp(contact);
      toast.success("OTP sent successfully! Please check your device.");
      console.log("useTherapistApi: OTP sent response", response);
      return response;
    } catch (error) {
      console.error("useTherapistApi: Error sending OTP", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the API call to verify an OTP.
   * @param {{ emailOrMobile: string, otp: string }} data - OTP and contact info.
   */
  const verifyOtp = async (data) => {
    setLoading(true);
    console.log("useTherapistApi: Verifying OTP...", data);
    try {
      const response = await verifyTherapistOtp(data);
      toast.success("OTP verified successfully!");
      console.log("useTherapistApi: OTP verification response", response);
      return response;
    } catch (error) {
      console.error("useTherapistApi: Error verifying OTP", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the API call to register a new therapist.
   * @param {object} data - Therapist's registration details.
   */
  const register = async (data) => {
  setLoading(true);
  console.log("useTherapistApi: Registering therapist...", data);

  try {
    // Call backend
    const res = await registerTherapist(data); 
    console.log("Backend response:", res);

    // Backend ALWAYS sends message
    const msg = res.message || "Something happened.";

    if (res.success === true) {
      // SUCCESS
      toast.success(msg);
      return res;
    } 
    
    if (res.success === false) {
      // BACKEND FAILURE (like 'Email already registered')
      toast.error(msg);
      throw new Error(msg);
    }

    // If backend gave unexpected shape
    toast.error(msg);
    throw new Error(msg);

  } catch (error) {
    // Axios error OR backend returned 4xx error JSON
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    toast.error(msg);
    console.error("Therapist Register Error:", msg);
    throw error;

  } finally {
    setLoading(false);
  }
};


  // The hook returns an object containing the loading state and the API functions.
  // This allows components to easily access them.
  return { loading, sendOtp, verifyOtp, register };
};
