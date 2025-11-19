// src/components/Auth/SignupForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";

export default function SignUpForm({ onOtpSent }) {
  const { register, handleSubmit } = useForm();
  const { handleSendOtp, loading } = useAuthApi();

  const onSubmit = async (data) => {
    if (!data.email) {
      alert("Please enter an email");
      return;
    }

    const response = await handleSendOtp(data.email);
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
        disabled={loading}
        className="w-full mb-3 p-2 border rounded-md"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md transition ${
          loading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}
