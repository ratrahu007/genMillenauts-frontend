// src/pages/TherapistSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTherapistApi } from "../hooks/useTherapistApi";
import AuthCard from "../components/Auth/AuthCard";
import OTPInput from "../components/Auth/OTPInput";
import { toast } from "sonner";
import vid from "../assets/AI_VID.mp4";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function TherapistSignupPage() {
  // useState hook to manage the current step of the signup flow ('sendOtp', 'verifyOtp').
  // This enables conditional rendering of different UI components.
  const [step, setStep] = useState("sendOtp");

  // useState hook to store the user's input (email or mobile).
  const [inputValue, setInputValue] = useState("");

  // useNavigate hook from react-router-dom to programmatically navigate between routes.
  const navigate = useNavigate();

  // Custom hook 'useTherapistApi' encapsulates API logic for therapist authentication.
  // It provides loading state and functions to interact with the backend.
  const { loading, sendOtp, verifyOtp } = useTherapistApi();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      toast.error("Please enter your email or mobile number.");
      return;
    }

    // Logic to determine if the input is an email or a mobile number.
    const isEmail = inputValue.includes("@");
    let payload;
    if (isEmail) {
      payload = { email: inputValue };
    } else {
      payload = { mobile: `+91${inputValue}` };
    }

    try {
      await sendOtp(payload);
      // Conditional rendering: Change the step to 'verifyOtp' on success.
      setStep("verifyOtp");
    } catch (error) {
      // Error is already handled and toasted in the custom hook.
      console.error("Failed to send OTP from component:", error);
    }
  };

  const handleOtpVerified = () => {
    // Programmatic navigation: On successful OTP verification, navigate to the registration page.
    // We pass the email/mobile in the router's 'state' to avoid using URL params for sensitive data.
    navigate("/therapist/register", { state: { emailOrMobile: inputValue } });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={vid} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-900/50 to-teal-800/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* Conditional rendering based on the 'step' state. */}
          {step === "sendOtp" && (
            <motion.div key="sendOtp" {...fadeSlide}>
              <AuthCard
                title="Therapist Signup"
                subtitle="Enter your email or mobile to receive an OTP"
              >
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div>
                    <label htmlFor="contact" className="sr-only">
                      Email or Mobile Number
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Email or Mobile Number"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-blue-400"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              </AuthCard>
            </motion.div>
          )}

          {step === "verifyOtp" && (
            <motion.div key="verifyOtp" {...fadeSlide}>
              {/* Component Composition: Reusing the OTPInput component for the verification step. */}
              <OTPInput
                formData={{ emailOrMobile: inputValue }}
                onOtpVerified={handleOtpVerified}
                apiFn={verifyOtp}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
