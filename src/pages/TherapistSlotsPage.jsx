import React from "react";
import { Link } from "react-router-dom";
import SlotList from "../components/dashboard/SlotList";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function TherapistSlotsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10">
      <header className="max-w-7xl mx-auto mb-10">
        <Link
          to="/therapist/dashboard"
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </header>
      <main className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SlotList />
        </motion.div>
      </main>
    </div>
  );
}
