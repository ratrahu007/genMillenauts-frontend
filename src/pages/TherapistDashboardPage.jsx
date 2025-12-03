import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import TherapistProfile from "../components/dashboard/TherapistProfile";
import CreateSlotForm from "../components/dashboard/CreateSlotForm";
import { useSlotApi } from "../hooks/useSlotApi";
import { motion } from "framer-motion";
import { Calendar, Heart, LogOut } from "lucide-react";

export default function TherapistDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { loading, handleGenerateSlots } = useSlotApi();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user || role !== 'therapist') {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10">
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between w-full max-w-7xl mx-auto mb-10"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-10 h-10 flex items-center justify-center rounded-xl shadow-md">
            <Heart className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Gen<span className="text-blue-500">Millenauts (Therapist)</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/therapist/slots"
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium">View Slots</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div>
          <TherapistProfile />
        </div>
        <div>
          <CreateSlotForm apiFn={handleGenerateSlots} loading={loading} />
        </div>
      </motion.main>
      
      <footer className="mt-16 text-gray-500 text-sm text-center w-full max-w-7xl mx-auto">
        Made with 💙 by <span className="font-medium text-blue-600">GenMillenauts</span>
      </footer>
    </div>
  );
}
