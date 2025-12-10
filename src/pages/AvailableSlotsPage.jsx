import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { useSlotApi } from "../hooks/useSlotApi";

const formatDate = (date) => {
  if (!date) return "No date";
  const d = new Date(date);
  if (d instanceof Date && !isNaN(d)) {
    return format(d, "MMMM d, yyyy");
  }
  return "Invalid date";
};

const formatTime = (time) => {
  if (typeof time !== "string") return "";
  const [hour, minute] = time.split(":");
  const d = new Date();
  d.setHours(parseInt(hour, 10));
  d.setMinutes(parseInt(minute, 10));
  if (d instanceof Date && !isNaN(d)) {
    return format(d, "h:mm a");
  }
  return "Invalid time";
};

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
          {slot.therapist?.fullName || "N/A"}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(slot.date)}</span>
          <Clock className="w-4 h-4 mr-2 ml-4" />
          <span>
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
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

export default function AvailableSlotsPage() {
  const [slots, setSlots] = useState([]);
  const { handleFetchAllPublicSlots, loading } = useSlotApi();

  useEffect(() => {
    const fetchPublicSlots = async () => {
      try {
        const data = await handleFetchAllPublicSlots();
        setSlots(data);
      } catch (error) {
        console.error("Error fetching public slots:", error);
      }
    };

    fetchPublicSlots();
  }, [handleFetchAllPublicSlots]);

  if (loading) {
    return <div className="text-center p-10">Loading slots...</div>;
  }

  if (!slots || slots.length === 0) {
    return <div className="text-center p-10">No slots found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Slots</h2>
          <div className="space-y-4">
            {slots.map((slot, index) => (
              <SlotItem key={slot.id} slot={slot} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
