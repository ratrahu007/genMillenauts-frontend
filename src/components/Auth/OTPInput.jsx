// src/components/Auth/OTPInput.jsx
// This component provides a user interface for entering and verifying a One-Time Password (OTP).
// It is designed to be a reusable part of a multi-step authentication flow (e.g., after signup or for password resets).
// It takes a formData object (containing email/mobile), an API function for verification, and a success callback as props.
// The component handles form state, basic validation, and displays loading and error messages.

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthCard from "./AuthCard";

// OTPInput component: A form for submitting an OTP for verification.
export default function OTPInput({
  formData,      // Data from the previous step, typically containing the user's email or mobile.
  onOtpVerified, // A callback function to execute upon successful OTP verification.
  apiFn,         // The API function to call for OTP verification.
  loading,       // A boolean indicating if the verification API call is in progress.
}) {
  // `react-hook-form` for managing the OTP input field.
  const { register, handleSubmit } = useForm();
  // State to hold and display any verification errors.
  const [error, setError] = useState("");

  // Handles the form submission.
  const onSubmit = async (data) => {
    const { otp } = data;
    const emailOrMobile = formData.emailOrMobile;

    // Basic validation to ensure OTP and contact info are present.
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    if (!emailOrMobile) {
      setError("Missing contact information for verification.");
      return;
    }

    setError(""); // Clear previous errors.

    try {
      // Call the provided API function with the contact info and OTP.
      await apiFn({ emailOrMobile, otp });
      // If the API call is successful, trigger the success callback.
      onOtpVerified();
    } catch (err) {
      // The API hook already shows a toast notification, but we can log and set a local error message.
      console.error("OTP verification failed in component:", err);
      setError(err.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    // Wraps the form in a consistent, styled authentication card.
    <AuthCard
      title="Verify Your Code"
      subtitle={`An OTP has been sent to ${formData.emailOrMobile}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="otp" className="sr-only">
            OTP
          </label>
          <input
            id="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            // Registers the input with validation rules.
            {...register("otp", { required: true, minLength: 6, maxLength: 6 })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest"
          />
        </div>

        {/* Display validation or API errors. */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Submit button that shows a loading state. */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-blue-400"
        >
          {loading ? "Verifying..." : "Verify & Proceed"}
        </button>
      </form>
    </AuthCard>
  );
}