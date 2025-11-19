// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, authSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyProfile } from "../services/userService";
import { Heart, LogOut, MessageCircle, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { token, user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);

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
  }, [token, navigate, dispatch, role, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 flex flex-col items-center px-6 py-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-8">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">
            <Heart className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Gen<span className="text-blue-500">Millenauts</span>
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Welcome Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 w-full max-w-4xl text-center border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Hey, {profile?.fullName || profile?.anyName || "Wellness Seeker"} 🌿
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Take a deep breath. You’re in a safe space to reflect, grow, and heal.
        </p>

        {/* Profile Info */}
        {profile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <strong>Email:</strong> {profile.email}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <strong>Username:</strong> {profile.anyName}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <strong>Mobile:</strong> {profile.mobile || profile.phone || "N/A"}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <strong>City:</strong> {profile.city || "N/A"}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner sm:col-span-2">
              <strong>Role:</strong>{" "}
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
                {profile.role || role}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading your profile...</p>
        )}
      </motion.div>

      {/* Feature Cards */}
      <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-indigo-100 to-blue-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col items-center text-center"
        >
          <Calendar className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Book a Session</h3>
          <p className="text-sm text-gray-600">
            Schedule your therapy or wellness session with our verified therapists.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-teal-100 to-green-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col items-center text-center"
        >
          <MessageCircle className="w-10 h-10 text-teal-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">AI Chat</h3>
          <p className="text-sm text-gray-600">
            Talk with your mental wellness AI assistant anytime, anywhere.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-pink-100 to-rose-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col items-center text-center"
        >
          <Heart className="w-10 h-10 text-rose-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Daily Affirmations</h3>
          <p className="text-sm text-gray-600">
            Get personalized affirmations and mindfulness reminders every day.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        Made with 💙 by <span className="font-medium text-blue-600">GenMillenauts</span>
      </footer>
    </motion.div>
  );
}
