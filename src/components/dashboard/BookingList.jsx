import React from "react";
import { motion } from "framer-motion";
import { UserCircle, Calendar, Clock, Video } from "lucide-react";
import { useSelector } from "react-redux";

const BookingList = ({ bookings }) => {
  const { role } = useSelector((state) => state.auth);

  if (!bookings || bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-500"
      >
        <div className="text-xl font-semibold">🌿 No Upcoming Sessions</div>
        <p className="text-sm mt-2">When you book a session, it will appear here.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.bookingId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {role === 'therapist' ? booking.userName : booking.therapistName}
                </h3>
                <p className="text-sm text-gray-500">
                  {role === 'therapist' ? 'Client' : booking.therapistSpeciality}
                </p>
              </div>
            </div>
            <span
              className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-semibold rounded-full ${
                booking.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 space-y-3 sm:space-y-0">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{booking.slotDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{booking.slotTime}</span>
                </div>
            </div>
            
            <motion.a
              href={booking.jitsiUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors hover:bg-blue-600"
            >
              <Video className="w-4 h-4" />
              Join Session
            </motion.a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookingList;
