// src/components/dashboard/BookingDetails.jsx
// This component is responsible for displaying the details of a user's booked therapy session.
// It receives a `booking` object as a prop and renders information such as the therapist's name,
// the date and time of the session, and a link to join the virtual meeting.
// The component uses Framer Motion for a smooth entrance animation and is styled to be
// a prominent and clear confirmation card on the user's dashboard.

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Video } from "lucide-react";

// BookingDetails component: Displays the details of a confirmed booking.
const BookingDetails = ({ booking }) => {
  // If no booking data is provided, the component renders nothing.
  if (!booking) return null;

  return (
    // The main container is animated to slide in and fade up.
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="backdrop-blur-xl bg-white/60 p-6 rounded-3xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.15)] border border-white/50"
    >
      {/* Title of the card. */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
        Your Session is Booked 🎉
      </h2>

      {/* Container for the booking details. */}
      <div className="space-y-5">

        {/* Therapist Information */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-md">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg tracking-tight">
              {booking.therapistName}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              {booking.therapistSpeciality}
            </p>
          </div>
        </div>

        {/* Session Date */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-gray-800 text-lg font-semibold">
            {booking.slotDate}
          </p>
        </div>

        {/* Session Time */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-gray-800 text-lg font-semibold">
            {booking.slotTime}
          </p>
        </div>

        {/* Link to Join the Session */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md">
            <Video className="w-5 h-5" />
          </div>
          <a
            href={booking.jitsiUrl} // The URL for the video call.
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-lg hover:underline transition-colors"
          >
            Join Live Session →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingDetails;