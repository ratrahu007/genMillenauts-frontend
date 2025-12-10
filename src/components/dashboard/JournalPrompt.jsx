// src/components/dashboard/JournalPrompt.jsx
// This component displays a daily journal prompt to encourage users to reflect and write.
// It features a curated list of prompts and deterministically selects one based on the day of the year,
// ensuring a new prompt is shown each day. The component is styled as an engaging card
// with an inviting "Write Now" button, encouraging user interaction.
// It uses Framer Motion for a subtle entrance animation and hover effects.

import React from "react";
import { motion } from "framer-motion";
import { Edit3, Feather } from "lucide-react";

// A predefined list of journal prompts.
const prompts = [
  "What is one thing that brought you joy today?",
  "Describe a challenge you faced recently and how you handled it.",
  "What are you grateful for right now?",
  "Write about a goal you have for this week.",
  "What is something you're looking forward to?",
  "How are you feeling, really?",
  "What is one thing you can do to take care of yourself today?",
];

// JournalPrompt component: A card that displays a new journal prompt each day.
const JournalPrompt = () => {
  // Calculates the current day of the year (e.g., 1 for Jan 1st, 365 for Dec 31st).
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  // Selects a prompt from the list using the modulo operator.
  // This ensures that the prompts cycle and a unique one is shown each day.
  const prompt = prompts[dayOfYear % prompts.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="from-orange-50 to-amber-100 bg-gradient-to-br p-6 rounded-xl shadow-lg border border-gray-200/80 flex flex-col items-center text-center h-full"
    >
      {/* Component Header */}
      <div className="flex items-center justify-center w-full mb-4">
        <Edit3 className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-semibold text-gray-800 ml-2">Daily Journal</h3>
      </div>
      
      {/* The selected daily prompt */}
      <p className="text-gray-700 text-xl font-serif italic flex-grow flex items-center justify-center my-4">
        "{prompt}"
      </p>
      
      {/* A call-to-action button to encourage writing. */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow-md transition-all"
      >
        <Feather size={18} />
        <span>Write Now</span>
      </motion.button>
    </motion.div>
  );
};

export default JournalPrompt;