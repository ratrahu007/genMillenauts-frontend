import React, { useState, useRef, useEffect } from "react";
import AuthCard from "./AuthCard";
import { toast } from "sonner";

const OTP_LENGTH = 6;

export default function OTPInput({ formData, onOtpVerified, apiFn, loading }) {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Move to the next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to the previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (paste.length === OTP_LENGTH && !isNaN(paste)) {
      const newOtp = paste.split('');
      setOtp(newOtp);
      inputsRef.current[OTP_LENGTH - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== OTP_LENGTH) {
      setError("Please fill all OTP fields.");
      return;
    }
    setError("");

    try {
      await apiFn({ emailOrMobile: formData.emailOrMobile, otp: enteredOtp });
      toast.success("Verification successful!");
      onOtpVerified();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputsRef.current[0].focus();
    }
  };

  return (
    <AuthCard
      title="Check Your Email"
      subtitle={`We sent a secure code to ${formData.emailOrMobile}`}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((data, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold text-white bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          ))}
        </div>

        {error && <p className="text-red-400 text-sm text-center -mt-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-blue-400"
        >
          {loading ? "Verifying..." : "Verify & Proceed"}
        </button>

        <div className="text-center text-sm text-gray-400">
          Didn't receive the code?{" "}
          <button type="button" className="font-semibold text-blue-400 hover:text-blue-300">
            Resend
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
