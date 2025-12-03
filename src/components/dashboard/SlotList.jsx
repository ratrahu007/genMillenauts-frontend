// src/components/dashboard/SlotList.jsx
import React, { useEffect } from "react";
import { useSlotApi } from "../../hooks/useSlotApi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, User } from "lucide-react";

const SlotItem = ({ slot, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center justify-between"
  >
    <div className="flex items-center">
      <div className="mr-4">
        <User className="w-5 h-5 text-teal-600" />
      </div>
      <div>
        <div className="font-bold text-gray-800">
          {slot.therapist.fullName}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(slot.date).toLocaleDateString()}</span>
          <Clock className="w-4 h-4 mr-2 ml-4" />
          <span>
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
      </div>
    </div>

    <div>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          slot.booked
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {slot.booked ? "Booked" : "Available"}
      </span>
    </div>
  </motion.div>
);

export default function SlotList() {
  const { handleFetchSlots } = useSlotApi();
  const { slots, loading } = useSelector((state) => state.slots);

  useEffect(() => {
    handleFetchSlots();
  }, [handleFetchSlots]);

  if (loading) {
    return <div className="text-center p-10">Loading slots...</div>;
  }

  if (!slots || slots.length === 0) {
    return <div className="text-center p-10">No slots found.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Slots</h2>
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <SlotItem key={slot.id} slot={slot} index={index} />
        ))}
      </div>
    </div>
  );
}
