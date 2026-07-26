// src/components/dashboard/WelcomeCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, PlusCircle, Smile, ArrowRight } from "lucide-react";

const WelcomeCard = ({ profile, role }) => {
    const name = profile?.fullName || "User";

    const therapistContent = (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
                to="/therapist/slots"
                className="group bg-white/50 hover:bg-white p-4 rounded-lg transition-all border border-gray-200/80 shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800">View Slots</h3>
                        <p className="text-sm text-gray-500">Manage your schedule</p>
                    </div>
                    <Calendar className="w-6 h-6 text-teal-500" />
                </div>
            </Link>
            <Link
                to="/therapist/dashboard" // Assuming the create form is on the dashboard
                className="group bg-white/50 hover:bg-white p-4 rounded-lg transition-all border border-gray-200/80 shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800">Create Slots</h3>
                        <p className="text-sm text-gray-500">Add new availability</p>
                    </div>
                    <PlusCircle className="w-6 h-6 text-blue-500" />
                </div>
            </Link>
        </div>
    );

    const userContent = (
        <div className="mt-6 text-center md:text-left">
            <p className="text-gray-600 mb-4">
                Your mental wellness journey is a path of strength. We're here to support you.
            </p>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-lg font-medium"
            >
                <Smile className="w-5 h-5" />
                <span>You're on the right track. Keep going!</span>
            </motion.div>
        </div>
    );

    return (
        <motion.div
            className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 p-8 rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-800">Welcome back, {name}!</h2>
                <p className="text-gray-500 mt-1">Here's your wellness summary.</p>
                {role === "therapist" ? therapistContent : userContent}
            </div>
        </motion.div>
    );
};

export default WelcomeCard;
