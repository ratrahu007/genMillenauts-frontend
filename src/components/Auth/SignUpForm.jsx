import React from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import AuthCard from "./AuthCard";
import { ArrowRight, Info } from "lucide-react";

export default function SignUpForm({ onOtpSent }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSendOtp, loading } = useAuthApi();

  const onSubmit = async (data) => {
    const response = await handleSendOtp(data.email);
    if (response.success) {
      if (onOtpSent) onOtpSent(data.email);
    }
  };

  return (
    <AuthCard
      title="Welcome to GenMillenauts"
      subtitle="Your journey to wellness starts here. Enter your email to proceed."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative flex items-center">
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", { 
              required: "An email is required to sign in.", 
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address."
              }
            })}
            disabled={loading}
            className="w-full pl-4 pr-32 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1 top-1 bottom-1 flex items-center justify-center px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-all duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.email && <p className="text-red-400 text-sm px-1">{errors.email.message}</p>}
        
        {!loading && (
          <div className="flex items-center justify-center gap-3 p-3 mt-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-shadow-blue-950 text-sm text-center">
              Enter your email to receive an OTP.
            </p>
          </div>
        )}
      </form>
    </AuthCard>
  );
}
