// src/components/Auth/AuthCard.jsx

// This component acts as a reusable container for authentication-related forms (e.g., login, signup).
// It provides a consistent visual wrapper with a subtle animation effect,
// enhancing the user experience by creating a clean, focused, and visually appealing card interface.

import React from "react";
import { motion } from "framer-motion";

// AuthCard component: A styled, animated container for authentication forms.
const AuthCard = ({ children }) => {
  return (
    // Uses Framer Motion to animate the card on mount (fades in and slides up).
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: invisible and slightly elevated.
      animate={{ opacity: 1, y: 0 }}   // Final state: fully visible and in its natural position.
      transition={{ duration: 0.3 }}   // Animation duration.
      className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg mx-auto mt-20"
    >
      {/* The content of the card (e.g., a login or signup form) is passed as children. */}
      {children}
    </motion.div>
  );
};

export default AuthCard;