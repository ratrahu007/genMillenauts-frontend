// src/pages/TherapistRegisterPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTherapistApi } from "../hooks/useTherapistApi";
import AuthCard from "../components/Auth/AuthCard";
import { toast } from "sonner";
import vid from "../assets/AI_VID.mp4";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function TherapistRegisterPage() {
  // useLocation hook from react-router-dom to access the state passed during navigation.
  // This is a secure way to pass data between routes without exposing it in the URL.
  const location = useLocation();
  const emailOrMobile = location.state?.emailOrMobile;

  // useNavigate hook for programmatic navigation after registration.
  const navigate = useNavigate();

  // Custom hook for API interactions.
  const { loading, register } = useTherapistApi();

  // useState hook to manage the form's state. Using a single state object for all form fields
  // makes it easier to manage and pass to the registration function. This is a controlled component pattern.
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    city: "",
    sessionPrice: "",
    bio: "",
    password: "",
  });

  // This function handles changes in all form inputs.
  // It uses the input's 'name' attribute to update the corresponding key in the 'formData' state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrMobile) {
      toast.error("Session expired. Please start the signup process again.");
      navigate("/therapist/signup");
      return;
    }

    // Construct the final payload for the registration API.
    let payload = { ...formData };

if (emailOrMobile.includes("@")) {
  payload.email = emailOrMobile;   // user signed up using email
} else {
  payload.mobile = emailOrMobile;  // user signed up using mobile
}


    try {
      await register(payload);
      // On successful registration, navigate the user to the login page.
      navigate("/therapist/login");
    } catch (error) {
      // Errors are toasted in the custom hook.
      console.error("Registration failed from component:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={vid} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-900/50 to-teal-800/60 backdrop-blur-sm"></div>

      <motion.div key="register" {...fadeSlide} className="relative z-10">
        <AuthCard
          title="Therapist Registration"
          subtitle="Complete your professional profile"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Each input is a controlled component, its value is tied to the component's state. */}
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="specialization"
              type="text"
              placeholder="Specialization (e.g., CBT, Family Therapy)"
              required
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="sessionPrice"
              type="number"
              placeholder="Session Price"
              required
              value={formData.sessionPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="bio"
              placeholder="Bio (e.g., 5 years experience)"
              required
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-blue-400"
            >
              {loading ? "Registering..." : "Complete Registration"}
            </button>
          </form>
        </AuthCard>
      </motion.div>
    </div>
  );
}
