// src/components/dashboard/WelcomeCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, PlusCircle, User, Smile } from "lucide-react";

const WelcomeCard = ({ profile, role }) => {

    const name = profile?.fullName || "User";

    // Content for Therapists
    const therapistContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
                to="/therapist/slots"
                className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition-all"
            >
                <Calendar className="w-6 h-6 text-teal-600" />
                <div>
                    <p className="font-semibold text-gray-800">View Slots</p>
                    <p className="text-sm text-gray-500">See all your available and booked slots.</p>
                </div>
            </Link>
            <div // This is not a link, but a visual cue to the form below
                className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl"
            >
                <PlusCircle className="w-6 h-6 text-blue-600" />
                <div>
                    <p className="font-semibold text-gray-800">Create Slots</p>
                    <p className="text-sm text-gray-500">Generate new availability for your clients.</p>
                </div>
            </div>
        </div>
    );

    // Content for Regular Users
    const userContent = (
        <div className="text-center md:text-left">
            <p className="text-gray-600 mb-6">
                Your mental wellness journey is important. We're here to support you every step of the way.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-2 bg-blue-50 text-blue-700 p-3 rounded-lg">
                <Smile className="w-5 h-5" />
                <span className="font-medium">You're doing great, keep it up!</span>
            </div>
        </div>
    );


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {name}!</h2>
            <p className="text-gray-500 mb-6">Here's a summary of your dashboard.</p>
            
            {role === "therapist" ? therapistContent : userContent}
            
        </motion.div>
    );
};

export default WelcomeCard;