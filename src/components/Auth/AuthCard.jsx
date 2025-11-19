// src/components/Auth/AuthCard.jsx
import React from "react";
import { motion } from "framer-motion";

const AuthCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg mx-auto mt-20"
    >
      {children}
    </motion.div>
  );
};

export default AuthCard;
