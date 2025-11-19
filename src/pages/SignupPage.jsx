// src/pages/SignupPage.jsx
import React, { useState } from "react";
import SignupForm from "../components/Auth/SignupForm";
import OTPInput from "../components/Auth/OTPInput";
import RegisterForm from "../components/Auth/RegisterForm";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthApi } from "../hooks/useAuthApi";
import vid from "../assets/AI_VID.mp4";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function SignupPage() {
  const [step, setStep] = useState("sendOtp");
  const [formData, setFormData] = useState({ emailOrMobile: "" });
  const { loading, verifyOtp } = useAuthApi();

  const handleOtpSent = (email) => {
    setFormData({ emailOrMobile: email });
    setStep("verifyOtp");
  };

  const handleOtpVerified = () => {
    setStep("register");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* 🌈 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={vid} type="video/mp4" />
      </video>

      {/* Overlay for soft gradient and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-900/50 to-teal-800/60 backdrop-blur-sm"></div>

      {/* Animated Form Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {step === "sendOtp" && (
            <motion.div key="sendOtp" {...fadeSlide}>
              <SignupForm onOtpSent={handleOtpSent} />
            </motion.div>
          )}

          {step === "verifyOtp" && (
            <motion.div key="verifyOtp" {...fadeSlide}>
              <OTPInput
                formData={formData}
                onOtpVerified={handleOtpVerified}
                apiFn={verifyOtp}
                loading={loading}
              />
            </motion.div>
          )}

          {step === "register" && (
            <motion.div key="register" {...fadeSlide}>
              <RegisterForm email={formData.emailOrMobile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
