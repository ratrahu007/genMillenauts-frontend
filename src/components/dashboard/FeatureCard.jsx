import React from "react";
import { motion } from "framer-motion";

const colorVariants = {
  blue: "border-t-blue-500 text-blue-500",
  teal: "border-t-teal-500 text-teal-500",
  rose: "border-t-rose-500 text-rose-500",
  red: "border-t-red-500 text-red-500",
};

const FeatureCard = ({ icon, title, description, color = "blue", onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className={`bg-white p-6 rounded-xl shadow-md border border-gray-200/80 border-t-4 ${colorVariants[color]} transition-shadow duration-300 cursor-pointer flex flex-col items-center text-center h-full`}
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1 flex-grow">
        {description}
      </p>
      <div className={`text-xs font-bold ${colorVariants[color]} mt-4`}>
        Learn More
      </div>
    </motion.div>
  );
};

export default FeatureCard;

