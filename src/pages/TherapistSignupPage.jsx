import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTherapistApi } from "../hooks/useTherapistApi";
import AuthCard from "../components/Auth/AuthCard";
import OTPInput from "../components/Auth/OTPInput";
import { toast } from "sonner";
import vid from "../assets/AI_VID.mp4";
import { ArrowRight, Mail, Phone, Info } from "lucide-react";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function TherapistSignupPage() {
  const [step, setStep] = useState("sendOtp");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { loading, sendOtp, verifyOtp } = useTherapistApi();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      toast.error("Please enter your email or mobile number to begin.");
      return;
    }
    const isEmail = inputValue.includes("@");
    const payload = isEmail ? { email: inputValue } : { mobile: `+91${inputValue}` };

    try {
      await sendOtp(payload);
      setStep("verifyOtp");
    } catch (error) {
      console.error("Failed to send OTP from component:", error);
    }
  };

  const handleOtpVerified = () => {
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
          {step === "sendOtp" && (
            <motion.div key="sendOtp" {...fadeSlide}>
              <AuthCard
                title="Join as a Therapist"
                subtitle="Start your journey with us. Verify your email or mobile to get started."
              >
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="relative flex items-center">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                      {inputValue.includes('@') ? <Mail /> : <Phone />}
                    </span>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full pl-10 pr-32 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="Email or Mobile Number"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-1 top-1 bottom-1 flex items-center justify-center px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-all duration-300 ease-in-out disabled:bg-blue-400"
                    >
                      {loading ? <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div> : <ArrowRight className="w-5 h-5" />}
                    </button>
                  </div>
                  {!loading && (
                    <div className="flex items-center justify-center gap-3 p-3 mt-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <p className="text-shadow-blue-950 text-sm text-center">
                        Enter your email  to receive an OTP.
                      </p>
                    </div>
                  )}
                </form>
              </AuthCard>
            </motion.div>
          )}

          {step === "verifyOtp" && (
            <motion.div key="verifyOtp" {...fadeSlide}>
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
