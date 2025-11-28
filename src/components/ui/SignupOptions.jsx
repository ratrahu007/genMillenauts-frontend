import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignupOptions = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleUserSignup = () => {
    onSelect();
    navigate("/signup");
  };

  const handleTherapistSignup = () => {
    onSelect();
    navigate("/therapist/signup");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="absolute top-16 right-4 bg-white rounded-md shadow-lg p-4 z-50"
    >
      <button
        onClick={handleUserSignup}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        User Signup
      </button>
      <button
        onClick={handleTherapistSignup}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Therapist Signup
      </button>
    </motion.div>
  );
};

export default SignupOptions;
