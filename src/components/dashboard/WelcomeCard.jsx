import React from "react";
import { motion } from "framer-motion";
import { Wind, Sparkles, User, Mail, MapPin, Users } from "lucide-react";
import Button from "../ui/Button";

const WelcomeCard = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full p-8 overflow-hidden rounded-2xl border border-gray-200/50 bg-white/60 shadow-2xl backdrop-blur-xl"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["-20%", "20%", "-20%"],
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-rose-100 via-purple-100 to-sky-100"
        />
        <div className="absolute w-96 h-96 bg-purple-300/50 rounded-full -top-16 -left-16 blur-3xl opacity-50"></div>
        <div className="absolute w-72 h-72 bg-sky-200/50 rounded-full -bottom-24 right-0 blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2"
        >
          <Sparkles className="text-purple-500" size={28} />
          Welcome back, {profile?.fullName || "Mindful One"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 text-md mb-8 font-serif italic max-w-md mx-auto"
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-500" />
              <span>{profile?.fullName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={18} className="text-gray-500" />
              <span>{profile?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-gray-500" />
              <span>{profile?.city || "Not set"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={18} className="text-gray-500" />
              <span>
                Offline meets:{" "}
                {profile?.isOptedForOfflineMeets ? "Opted In" : "Opted Out"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.6,
          }}
        >
          <Button
            
            className="bg-blue-500/80 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <Wind size={20} className="mr-2" />
            Begin a Moment of Calm
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;

