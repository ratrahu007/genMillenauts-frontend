// src/components/Auth/OTPInput.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthCard from "./AuthCard";

export default function OTPInput({
  formData,
  onOtpVerified,
  apiFn,
  loading,
}) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { otp } = data;
    const emailOrMobile = formData.emailOrMobile;

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    if (!emailOrMobile) {
      setError("Missing contact information for verification.");
      return;
    }

    setError("");

    try {
      await apiFn({ emailOrMobile, otp });
      onOtpVerified(); // Callback for successful verification
    } catch (err) {
      // Error is already toasted by the calling hook, but we can log it
      console.error("OTP verification failed in component:", err);
      setError(err.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
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
            {...register("otp", { required: true, minLength: 6, maxLength: 6 })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

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
