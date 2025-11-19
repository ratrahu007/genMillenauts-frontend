// src/pages/LoginPage.jsx
import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/Auth/LoginForm";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div key="login" {...fadeSlide}>
        <LoginForm />
      </motion.div>
    </div>
  );
}
