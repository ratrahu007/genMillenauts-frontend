import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import TherapistProfile from "../components/dashboard/TherapistProfile";
import CreateSlotForm from "../components/dashboard/CreateSlotForm";
import { useSlotApi } from "../hooks/useSlotApi";
import { motion } from "framer-motion";
import { Calendar, Heart, LogOut } from "lucide-react";
import { useBookingApi } from "../hooks/useBookingApi";
import BookingList from "../components/dashboard/BookingList";

export default function TherapistDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { loading, handleGenerateSlots } = useSlotApi();
  const { bookings, loading: bookingsLoading, error: bookingsError, getBookings } =
    useBookingApi();

  useEffect(() => {
    if (role === "therapist") {
      getBookings();
    }
  }, [role, getBookings]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user || role !== "therapist") {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 overflow-hidden">

      {/* Floating animated gradient blob */}
      <div
        className="absolute top-20 -left-10 w-72 h-72 bg-purple-300 opacity-25 rounded-full blur-3xl animate-[floatingBlob_8s_ease-in-out_infinite]"
      />
      <div
        className="absolute bottom-20 -right-10 w-72 h-72 bg-teal-300 opacity-25 rounded-full blur-3xl animate-[floatingBlob_10s_ease-in-out_infinite]"
      />

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 shadow-lg border-b border-white/40"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg">
              <Heart className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              GenMillenauts <span className="text-blue-500">Therapist</span> Portal
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/therapist/slots"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <Calendar className="w-5 h-5" />
              View Slots
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/80 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-10"
        >
          <TherapistProfile />
          <CreateSlotForm apiFn={handleGenerateSlots} loading={loading} />
        </motion.div>

        {/* RIGHT COLUMN — BOOKINGS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upcoming Sessions 🌿
          </h2>

          {bookingsLoading && <p>Loading bookings...</p>}
          {bookingsError && <p className="text-red-500">{bookingsError}</p>}

          {bookings && <BookingList bookings={bookings} />}
        </motion.div>
      </motion.main>

      {/* FOOTER */}
      <footer className="mt-20 pb-10 text-center text-gray-600 text-sm">
        Made with 💙 by <span className="font-semibold text-blue-600">GenMillenauts</span>
      </footer>
    </div>
  );
}
