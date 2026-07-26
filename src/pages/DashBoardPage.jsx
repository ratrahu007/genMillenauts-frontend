import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, authSuccess } from "../redux/slices/authSlice";
import { getLatestStress, getWeeklyStress } from "../redux/slices/stressSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyProfile } from "../services/userService";
import { useBookingApi } from "../hooks/useBookingApi";
import BookingList from "../components/dashboard/BookingList";
import { Heart, LogOut, Calendar, Users, ShieldAlert, ListChecks, AlertTriangle, BarChart2, Activity, Smile } from "lucide-react";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import FeatureCard from "../components/dashboard/FeatureCard";
import JournalPrompt from "../components/dashboard/JournalPrompt";
import AiCompanion from "../components/dashboard/AiCompanion";

// Helper to format date and day
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${day}, ${formattedDate}`;
};

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
            } catch (err) { console.error("Error fetching profile:", err); }
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
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const renderBookingContent = () => {
        if (bookingsLoading) return <div className="text-center p-10 text-gray-500">Loading sessions...</div>;
        if (bookingsError) return (
            <div className="text-center py-10 px-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
                <h3 className="mt-2 text-md font-semibold text-red-600">Could not load sessions</h3>
                <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
            </div>
        );
        return <BookingList bookings={bookings} />;
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-12 gap-6">
                    
                    {/* Main Content Column */}
                    <section className="col-span-12 lg:col-span-8 space-y-6">
                        <motion.div variants={item}><WelcomeCard profile={profile} role={role} /></motion.div>
                        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
                            {renderBookingContent()}
                        </motion.div>
                        <motion.div variants={item}><AiCompanion /></motion.div>
                    </section>

                    {/* Sidebar Column */}
                    <aside className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Stats Section */}
                        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Wellness Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Activity className="w-6 h-6 text-rose-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700">Latest Stress Level</p>
                                        <p className="text-2xl font-bold text-rose-500">{latestStress?.stress_level || "N/A"}</p>
                                    </div>
                                </div>
                                
                                {/* Weekly Mood Display */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <BarChart2 className="w-5 h-5 text-indigo-500" />
                                        Weekly Mood
                                    </h4>
                                    {weeklyStress && weeklyStress.length > 0 ? (
                                        weeklyStress.map((day, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                                                <span className="text-sm font-medium text-gray-600">{formatDate(day.date)}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-indigo-600">{day.overallMood}</span>
                                                    {day.overallMood === 'HAPPY' && <Smile className="w-5 h-5 text-yellow-500" />}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No weekly data available.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions Section */}
                        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Tools & Actions</h3>
                            <div className="space-y-3">
                                <FeatureCard icon={<Calendar className="w-6 h-6 text-blue-500" />} title="Book a Session" description="Find a therapist." onClick={() => navigate("/therapists")} />
                                <FeatureCard icon={<Users className="w-6 h-6 text-purple-500" />} title="Community" description="Connect with others." />
                                <FeatureCard icon={<ListChecks className="w-6 h-6 text-green-500" />} title="View Alert Contacts" description="See your contacts." onClick={() => navigate("/alert-contacts")} />
                                <FeatureCard icon={<ShieldAlert className="w-6 h-6 text-red-500" />} title="Add Alert Contact" description="Add a new contact." onClick={() => navigate("/add-alert-contact")} />
                            </div>
                        </motion.div>
                        
                        <motion.div variants={item}><JournalPrompt /></motion.div>
                    </aside>

                </motion.div>
            </main>
        </div>
    );
}
