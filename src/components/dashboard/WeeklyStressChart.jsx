// src/components/dashboard/WeeklyStressChart.jsx
// This component visualizes the user's weekly stress and mood data in a simple bar chart format.
// It receives an array of `weeklyStress` data, where each entry represents a day with an average stress level
// and an overall mood. The height of each bar corresponds to the stress level for that day,
// and an emoji represents the user's mood. This provides a quick, visual summary of the user's
// emotional state over the past week. The component uses Framer Motion to animate the bars,
// making the chart more engaging.

import React from "react";
import { motion } from "framer-motion";

// WeeklyStressChart component: A bar chart visualizing weekly stress and mood data.
const WeeklyStressChart = ({ weeklyStress }) => {
  // If data is not yet available, display a loading message.
  if (!weeklyStress || weeklyStress.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500">Loading weekly stress data...</p>
      </div>
    );
  }

  // Find the maximum stress value in the data to scale the bars correctly.
  const maxStress = Math.max(...weeklyStress.map((d) => d.averageStress), 10);

  // A mapping of mood labels to corresponding emojis for visual representation.
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
        {/* Map over the weekly data to render a bar and emoji for each day. */}
        {weeklyStress.map((data, index) => (
          <motion.div
            key={data.date}
            className="flex flex-col items-center flex-1"
            // Animate the height and opacity of each bar to create a "growing" effect.
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: `${(data.averageStress / maxStress) * 100}%`, // Bar height is relative to the max stress level.
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation for each bar.
          >
            <div className="w-full bg-green-300 rounded-t-lg hover:bg-green-400 transition-colors" />
            <p className="text-2xl mt-2">{moodEmojis[data.overallMood] || "😐"}</p>
            <p className="text-xs text-gray-500 mt-1">
              {/* Display the abbreviated day of the week. */}
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