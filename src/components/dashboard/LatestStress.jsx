import React from "react";
import { motion } from "framer-motion";

const LatestStress = ({ latestStress }) => {
  if (!latestStress) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500">Loading latest stress data...</p>
      </div>
    );
  }

  const { stressIndex, mood, time } = latestStress;

  const getStressColor = (index) => {
    if (index <= 3) return "text-green-500";
    if (index <= 7) return "text-yellow-500";
    return "text-red-500";
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
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-600">Stress Index</p>
          <p className={`text-4xl font-bold ${getStressColor(stressIndex)}`}>
            {stressIndex}
            <span className="text-lg text-gray-500">/100</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-600">Current Mood</p>
          <p className="text-2xl font-semibold text-gray-800">{mood}</p>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-6">
        Last updated: {new Date(time).toLocaleString()}
      </div>
    </motion.div>
  );
};

export default LatestStress;
