import React from "react";
import { motion } from "framer-motion";
import { Edit3, Feather } from "lucide-react";

const prompts = [
  "What is one thing that brought you joy today?",
  "Describe a challenge you faced recently and how you handled it.",
  "What are you grateful for right now?",
  "Write about a goal you have for this week.",
  "What is something you're looking forward to?",
  "How are you feeling, really?",
  "What is one thing you can do to take care of yourself today?",
];

const JournalPrompt = () => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const prompt = prompts[dayOfYear % prompts.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="from-orange-50 to-amber-100 bg-gradient-to-br p-6 rounded-xl shadow-lg border border-gray-200/80 flex flex-col items-center text-center h-full"
    >
      <div className="flex items-center justify-center w-full mb-4">
        <Edit3 className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-semibold text-gray-800 ml-2">Daily Journal</h3>
      </div>
      <p className="text-gray-700 text-xl font-serif italic flex-grow flex items-center justify-center my-4">
        "{prompt}"
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow-md transition-all duration-200 ease-in-out hover:shadow-lg"
      >
        <Feather size={18} />
        <span>Write Now</span>
      </motion.button>
    </motion.div>
  );
};

export default JournalPrompt;

