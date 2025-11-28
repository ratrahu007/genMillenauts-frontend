import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginOptions = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    onSelect();
    navigate("/login");
  };

  const handleTherapistLogin = () => {
    onSelect();
    navigate("/therapist/login");
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
        onClick={handleUserLogin}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        User Login
      </button>
      <button
        onClick={handleTherapistLogin}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Therapist Login
      </button>
    </motion.div>
  );
};

export default LoginOptions;
