import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Meh, Frown, Star } from "lucide-react";

const moods = [
  { icon: Frown, label: "Sad", color: "text-blue-500", bgColor: "bg-blue-100/70" },
  { icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-100/70" },
  { icon: Smile, label: "Good", color: "text-green-500", bgColor: "bg-green-100/70" },
  { icon: Star, label: "Great", color: "text-purple-500", bgColor: "bg-purple-100/70" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 text-center h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">How are you feeling today?</h3>
      <div className="flex justify-around items-center">
        {moods.map((mood, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9, rotate: -3 }}
            onClick={() => setSelectedMood(mood.label)}
            className={`p-3 rounded-full cursor-pointer transition-all duration-300 transform-gpu
              ${ selectedMood === mood.label
                ? `${mood.bgColor} shadow-lg`
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <mood.icon className={`w-10 h-10 transition-colors duration-300 ${
              selectedMood === mood.label ? mood.color : 'text-gray-400'
            }`} />
          </motion.div>
        ))}
      </div>
      <div className="h-8 mt-4">
        {selectedMood && (
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-gray-600 text-sm"
          >
            You're feeling <strong>{selectedMood}</strong>. That's noted!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default MoodTracker;
