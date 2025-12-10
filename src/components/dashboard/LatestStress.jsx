// src/components/dashboard/LatestStress.jsx
// This component is designed to display the user's most recent stress and mood data on their dashboard.
// It receives a `latestStress` object as a prop, which contains the stress index, mood, and the time of the update.
// The component visually represents the stress level with a color-coded score (green, yellow, or red)
// to provide a quick, at-a-glance understanding of the user's state. If no data is available,
// it displays a loading message.

import React from "react";
import { motion } from "framer-motion";

// LatestStress component: A card displaying the most recent stress and mood reading.
const LatestStress = ({ latestStress }) => {
  // If the `latestStress` prop is not yet available, show a loading state.
  if (!latestStress) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500">Loading latest stress data...</p>
      </div>
    );
  }

  // Destructure the data from the prop for easier access.
  const { stressIndex, mood, time } = latestStress;

  // A utility function to determine the color of the stress index based on its value.
  const getStressColor = (index) => {
    if (index <= 3) return "text-green-500"; // Low stress
    if (index <= 7) return "text-yellow-500"; // Moderate stress
    return "text-red-500"; // High stress
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-2xl shadow-lg h-full"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Your Latest Update
      </h3>
      <div className="flex flex-col space-y-6">
        {/* Display the stress index with its corresponding color. */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-600">Stress Index</p>
          <p className={`text-4xl font-bold ${getStressColor(stressIndex)}`}>
            {stressIndex}
            <span className="text-lg text-gray-500">/100</span>
          </p>
        </div>
        
        {/* Display the user's reported mood. */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-600">Current Mood</p>
          <p className="text-2xl font-semibold text-gray-800">{mood}</p>
        </div>
      </div>
      
      {/* Timestamp of the last update. */}
      <div className="text-xs text-gray-400 text-center mt-6">
        Last updated: {new Date(time).toLocaleString()}
      </div>
    </motion.div>
  );
};

export default LatestStress;