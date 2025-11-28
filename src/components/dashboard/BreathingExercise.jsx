import React from "react";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";

const BreathingExercise = () => {
  return (
    <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 flex flex-col items-center justify-center text-center h-full">
      <div className="flex items-center justify-center w-full mb-4">
        <Wind className="w-5 h-5 text-blue-500" />
        <h3 className="text-md font-semibold text-gray-800 ml-2">Calm Breathing</h3>
      </div>
      
      <div className="relative w-32 h-32 flex items-center justify-center my-2">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute w-full h-full bg-blue-200 rounded-full"
        />
        <p className="z-10 font-medium text-blue-800">Breathe</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Inhale as it expands, exhale as it contracts.
      </p>
    </motion.div>
  );
};

export default BreathingExercise;
