// src/components/dashboard/BreathingExercise.jsx
// This component provides a simple, animated visual aid for a calming breathing exercise.
// It features a "pulsing" circle that expands and contracts, visually guiding the user
// to inhale and exhale in a slow, rhythmic pattern. The animation is created using
// Framer Motion and is set to repeat indefinitely, allowing users to engage with it
// for as long as they need.

import React from "react";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";

// BreathingExercise component: A visual guide for a simple breathing exercise.
const BreathingExercise = () => {
  return (
    <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 flex flex-col items-center justify-center text-center h-full">
      {/* Header for the component */}
      <div className="flex items-center justify-center w-full mb-4">
        <Wind className="w-5 h-5 text-blue-500" />
        <h3 className="text-md font-semibold text-gray-800 ml-2">Calm Breathing</h3>
      </div>
      
      {/* The main visual element: an animated circle */}
      <div className="relative w-32 h-32 flex items-center justify-center my-2">
        {/* The animated circle using Framer Motion */}
        <motion.div
          animate={{
            // The animation scales the circle up and back down, and fades the opacity.
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4, // The duration of one full "breath" cycle (4 seconds).
            ease: "easeInOut",
            repeat: Infinity, // The animation loops forever.
          }}
          className="absolute w-full h-full bg-blue-200 rounded-full"
        />
        {/* Text centered inside the circle */}
        <p className="z-10 font-medium text-blue-800">Breathe</p>
      </div>
      
      {/* Instructional text below the animation */}
      <p className="text-xs text-gray-500 mt-2">
        Inhale as it expands, exhale as it contracts.
      </p>
    </motion.div>
  );
};

export default BreathingExercise;