import React from "react";
import { motion } from "framer-motion";

const WeeklyStressChart = ({ weeklyStress }) => {
  if (!weeklyStress || weeklyStress.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500">Loading weekly stress data...</p>
      </div>
    );
  }

  const maxStress = Math.max(...weeklyStress.map((d) => d.averageStress), 10);

  const moodEmojis = {
    HAPPY: "😊",
    CALM: "😌",
    SAD: "😔",
    ANXIOUS: "😟",
    NEUTRAL: "😐",
    GOOD: "🙂",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-2xl shadow-lg h-full"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Your Weekly Summary
      </h3>
      <div className="flex justify-between items-end h-56 space-x-2">
        {weeklyStress.map((data, index) => (
          <motion.div
            key={data.date}
            className="flex flex-col items-center flex-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: `${(data.averageStress / maxStress) * 100}%`,
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-full bg-green-300 rounded-t-lg hover:bg-green-400 transition-colors" />
            <p className="text-2xl mt-2">{moodEmojis[data.overallMood] || "😐"}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(data.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyStressChart;
