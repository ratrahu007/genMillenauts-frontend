import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, authSuccess } from "../redux/slices/authSlice";
import { getLatestStress, getWeeklyStress } from "../redux/slices/stressSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyProfile } from "../services/userService";
import { useBookingApi } from "../hooks/useBookingApi";
import BookingList from "../components/dashboard/BookingList";
import { Heart, LogOut, Calendar, Users, ShieldAlert, ListChecks, AlertTriangle } from "lucide-react";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import FeatureCard from "../components/dashboard/FeatureCard";
import LatestStress from "../components/dashboard/LatestStress";
import WeeklyStressChart from "../components/dashboard/WeeklyStressChart";
import JournalPrompt from "../components/dashboard/JournalPrompt";
import MoodTracker from "../components/dashboard/MoodTracker";
import AiCompanion from "../components/dashboard/AiCompanion";

export default function DashboardPage() {
    const { token, user, role } = useSelector((state) => state.auth);
    const { latestStress, weeklyStress } = useSelector((state) => state.stress);
    const { bookings, loading: bookingsLoading, error: bookingsError, getBookings } = useBookingApi();
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
        dispatch(getLatestStress());
        dispatch(getWeeklyStress());
        getBookings();
    }, [token, user, role, navigate, dispatch, getBookings]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const item = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const renderBookingContent = () => {
        if (bookingsLoading) {
            return <p>Loading bookings...</p>;
        }
        if (bookingsError) {
            return (
                <div className="text-center py-10 px-4">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-red-600">Could not load bookings</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        There was a problem fetching your session data from the server. Please try again later.
                        This is likely a temporary issue with our services.
                    </p>
                </div>
            );
        }
        return <BookingList bookings={bookings} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10"
        >
            <header className="flex items-center justify-between max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">
                        <Heart className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
                        Gen<span className="text-blue-500">Millenauts</span>
                    </h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </header>
            <motion.main
                variants={container}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                <div className="lg:col-span-2 space-y-8">
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                        <WelcomeCard profile={profile} role={role} />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Sessions</h2>
                        {renderBookingContent()}
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                            <LatestStress latestStress={latestStress} />
                        </motion.div>
                        <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                            <WeeklyStressChart weeklyStress={weeklyStress} />
                        </motion.div>
                    </div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                        <MoodTracker />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                        <AiCompanion />
                    </motion.div>
                </div>
                <div className="space-y-8">
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow cursor-pointer" onClick={() => navigate("/therapists")}>
                        <FeatureCard
                            icon={<Calendar className="w-8 h-8 text-blue-500" />}
                            title="Book a Session"
                            description="Find and schedule with a therapist."
                        />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow cursor-pointer">
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-rose-500" />}
                            title="Community"
                            description="Connect in a safe supportive space."
                        />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow cursor-pointer"
                        onClick={() => navigate("/alert-contacts")}
                    >
                        <FeatureCard
                            icon={<ListChecks className="w-8 h-8 text-indigo-500" />}
                            title="View Alert Contacts"
                            description="Your trusted emergency contacts."
                        />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow cursor-pointer"
                        onClick={() => navigate("/add-alert-contact")}
                    >
                        <FeatureCard
                            icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                            title="Add Alert Contact"
                            description="Add someone you trust during emergencies."
                        />
                    </motion.div>
                    <motion.div variants={item} className="bg-white p-5 rounded-xl shadow">
                        <JournalPrompt />
                    </motion.div>
                </div>
            </motion.main>
            <footer className="mt-16 text-slate-500 text-center text-sm">
                Made with 💙 by <span className="font-medium text-blue-600">GenMillenauts</span>
            </footer>
        </motion.div>
    );
}
