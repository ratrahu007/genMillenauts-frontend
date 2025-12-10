import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, authSuccess } from "../redux/slices/authSlice";
import { getLatestStress, getWeeklyStress } from "../redux/slices/stressSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getMyProfile } from "../services/userService";
import { getBookingById } from "../services/bookingService";

import {
  Heart,
  LogOut,
  Calendar,
  Users,
  ShieldAlert,
  ListChecks,
} from "lucide-react";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import FeatureCard from "../components/dashboard/FeatureCard";
import LatestStress from "../components/dashboard/LatestStress";
import WeeklyStressChart from "../components/dashboard/WeeklyStressChart";
import JournalPrompt from "../components/dashboard/JournalPrompt";
import MoodTracker from "../components/dashboard/MoodTracker";
import AiCompanion from "../components/dashboard/AiCompanion";
import BookingDetails from "../components/dashboard/BookingDetails";

export default function DashboardPage() {
  const { token, user, role } = useSelector((state) => state.auth);
  const { latestStress, weeklyStress } = useSelector((state) => state.stress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(user);
  const [booking, setBooking] = useState(null);

  // ---------------------------------------------
  // ✅ Effect 1 — Fetch profile + stress analytics
  // ---------------------------------------------
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getMyProfile(token);
        setProfile(data);

        dispatch(authSuccess({ token, role, user: data }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (!user?.email) fetchProfile();

    dispatch(getLatestStress());
    dispatch(getWeeklyStress());
  }, [token, user, role, navigate, dispatch]);

  // ---------------------------------------------
  // ✅ Effect 2 — Fetch booking by bookingId (saved after payment)
  // ---------------------------------------------
  useEffect(() => {
    const fetchBooking = async () => {
      const bookingId = localStorage.getItem("latestBookingId");
      if (!bookingId) return;

      try {
        const data = await getBookingById(token, bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [token]);

  // ---------------------------------------------
  // Logout handler
  // ---------------------------------------------
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ---------------------------------------------
  // Animations
  // ---------------------------------------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  };

  // ---------------------------------------------
  // Render UI
  // ---------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
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
            Gen<span className="text-blue-500">Millenauts</span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.header>

      {/* MAIN CONTENT */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <WelcomeCard profile={profile} role={role} />
          </motion.div>

          {/* Booking Details */}
          <motion.div variants={itemVariants}>
            <BookingDetails booking={booking} />
          </motion.div>

          {/* Stress Components */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <LatestStress latestStress={latestStress} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <WeeklyStressChart weeklyStress={weeklyStress} />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <MoodTracker />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AiCompanion />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-500" />}
              title="Book a Session"
              description="Find and schedule with a therapist."
              color="blue"
              onClick={() => navigate("/therapists")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={<Users className="w-8 h-8 text-rose-500" />}
              title="Community"
              description="Connect in a safe space."
              color="rose"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={<ListChecks className="w-8 h-8 text-indigo-500" />}
              title="View Alert Contacts"
              description="View your trusted contacts for emergencies."
              color="indigo"
              onClick={() => navigate("/alert-contacts")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
              title="Add Alert Contact"
              description="Add a trusted contact for emergencies."
              color="red"
              onClick={() => navigate("/add-alert-contact")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <JournalPrompt />
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm text-center w-full max-w-7xl mx-auto">
        Made with 💙 by <span className="font-medium text-blue-600">GenMillenauts</span>
      </footer>
    </div>
  );
}
