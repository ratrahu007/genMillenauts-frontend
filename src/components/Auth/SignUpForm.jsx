// src/components/Auth/SignUpForm.jsx
// This component represents the initial step of the user registration process.
// Its primary purpose is to collect the user's email address and trigger the sending of a One-Time Password (OTP).
// It uses `react-hook-form` for simple form management and the `useAuthApi` custom hook to interact with the backend OTP service.
// Upon successful OTP dispatch, it invokes a callback function (`onOtpSent`) to notify the parent component,
// which typically then transitions the view to an OTP input form.

import React from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";

// SignUpForm component: The first step in the registration flow, for sending an OTP.
export default function SignUpForm({ onOtpSent }) {
  // `react-hook-form` for managing the email input.
  const { register, handleSubmit } = useForm();
  
  // Custom hook to access the OTP sending functionality.
  // - `handleSendOtp`: The function that calls the API to send an OTP to the provided email.
  // - `loading`: A boolean to indicate when the API call is in progress.
  const { handleSendOtp, loading } = useAuthApi();

  // This function is called upon form submission.
  const onSubmit = async (data) => {
    // Basic validation to ensure an email is entered.
    if (!data.email) {
      alert("Please enter an email");
      return;
    }

    // Call the API to send the OTP.
    const response = await handleSendOtp(data.email);
    
    // If the OTP is sent successfully, execute the callback function passed via props.
    // This allows the parent component to proceed to the next step (e.g., show the OTP input form).
    if (response.success) {
      if (onOtpSent) onOtpSent(data.email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg p-6 rounded-2xl w-96"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        required
        disabled={loading} // Disable input while the API call is in progress.
        className="w-full mb-3 p-2 border rounded-md"
      />

      <button
        type="submit"
        disabled={loading} // Disable the button during the API call.
        className={`w-full py-2 rounded-md transition ${
          loading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed" // Loading state style.
            : "bg-blue-600 text-white hover:bg-blue-700"  // Default style.
        }`}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}