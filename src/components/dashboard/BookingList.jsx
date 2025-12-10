import React from "react";
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

const BookingList = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 text-gray-400"
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          <div className="text-2xl font-semibold">🌿 No Sessions Yet</div>
          <p className="text-sm mt-2">
            Begin your wellness journey whenever you feel ready.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.bookingId}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, type: "spring", stiffness: 70 }}
          whileHover={{ scale: 1.025 }}
          className="relative rounded-3xl p-[2px] bg-gradient-to-br 
                     from-teal-300 via-blue-300 to-purple-300 shadow-xl"
        >
          {/* Glass Inner Card */}
          <div
            className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-7
                       border border-white/40 shadow-lg"
          >
            {/* Floating Aura Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute -inset-5 rounded-3xl bg-gradient-to-br 
                         from-teal-200/40 via-blue-200/40 to-purple-200/40 
                         blur-3xl pointer-events-none"
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between">
              {/* User avatar */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br 
                                from-blue-200 to-purple-200 flex items-center 
                                justify-center shadow-inner">
                  <UserCircle className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800 tracking-wide">
                    {booking.userName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Session booked with you
                  </p>
                </div>
              </div>

              {/* Status */}
              <span
                className={`px-4 py-1 text-xs font-semibold rounded-full shadow-sm
                ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }`}
              >
                {booking.status}
              </span>
            </div>

            {/* Body */}
            <div className="relative z-10 mt-6 text-gray-700 text-sm space-y-2">
              <p>
                📅 <span className="font-medium">{booking.slotDate}</span>
              </p>
              <p>
                ⏰ <span className="font-medium">{booking.slotTime}</span>
              </p>
            </div>

            {/* Jitsi Button */}
            <motion.a
              href={booking.jitsiUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 mt-6 inline-block bg-gradient-to-r 
                         from-teal-500 to-blue-500 text-white py-2 px-5 
                         rounded-full font-semibold shadow-md text-sm
                         hover:shadow-lg hover:opacity-95 transition"
            >
              🌐 Join Live Session
            </motion.a>

            {/* Therapist branding */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              className="absolute bottom-4 right-4 text-[10px] text-gray-500"
            >
              Powered by GenMillenauts Therapy
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookingList;
