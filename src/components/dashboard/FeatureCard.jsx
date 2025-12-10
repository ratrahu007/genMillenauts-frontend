// src/components/dashboard/FeatureCard.jsx
// This component is a reusable UI element designed to showcase a specific feature on the dashboard.
// It displays an icon, title, and description in a clean, card-based format.
// The card is interactive, featuring a hover effect and an `onClick` handler to trigger actions.
// It also supports different color themes (blue, teal, rose, red) to visually distinguish different features,
// which is controlled by the `color` prop.

import React from "react";
import { motion } from "framer-motion";

// An object mapping color names to corresponding Tailwind CSS classes.
// This allows for dynamic styling based on the `color` prop.
const colorVariants = {
  blue: "border-t-blue-500 text-blue-500",
  teal: "border-t-teal-500 text-teal-500",
  rose: "border-t-rose-500 text-rose-500",
  red: "border-t-red-500 text-red-500",
};

// FeatureCard component: A visually distinct card for highlighting a feature.
const FeatureCard = ({ icon, title, description, color = "blue", onClick }) => {
  return (
    // The card uses Framer Motion to animate on hover (lifts up and adds a shadow).
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className={`bg-white p-6 rounded-xl shadow-md border border-gray-200/80 border-t-4 ${colorVariants[color]} transition-shadow duration-300 cursor-pointer flex flex-col items-center text-center h-full`}
      onClick={onClick}
    >
      {/* The icon for the feature. */}
      <div className="mb-4">{icon}</div>
      
      {/* The title of the feature. */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      
      {/* The description of the feature. */}
      <p className="text-sm text-gray-600 mt-1 flex-grow">
        {description}
      </p>
      
      {/* A "Learn More" text to indicate interactivity. */}
      <div className={`text-xs font-bold ${colorVariants[color]} mt-4`}>
        Learn More
      </div>
    </motion.div>
  );
};

export default FeatureCard;