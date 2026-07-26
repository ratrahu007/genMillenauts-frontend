// src/components/dashboard/FeatureCard.jsx
// This component is a reusable UI element designed to showcase a specific feature on the dashboard.
// It displays an icon, title, and description in a clean, card-based format.
// The card is interactive, featuring a hover effect and an `onClick` handler to trigger actions.

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// FeatureCard component: A visually distinct card for highlighting a feature.
const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.07)" }}
      className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80 transition-shadow duration-300 cursor-pointer flex items-center gap-4 h-full"
      onClick={onClick}
    >
      {/* The icon for the feature. */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
        {icon}
      </div>
      
      <div className="flex-grow">
        {/* The title of the feature. */}
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        
        {/* The description of the feature. */}
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
    </motion.div>
  );
};

export default FeatureCard;
