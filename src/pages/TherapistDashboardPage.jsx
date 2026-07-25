import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TherapistProfile from "../components/dashboard/TherapistProfile";
import CreateSlotForm from "../components/dashboard/CreateSlotForm";
import WelcomeCard from "../components/dashboard/WelcomeCard"; // Import WelcomeCard
import { useSlotApi } from "../hooks/useSlotApi";
import { motion } from "framer-motion";
import { useBookingApi } from "../hooks/useBookingApi";
import BookingList from "../components/dashboard/BookingList";

export default function TherapistDashboardPage() {
    const { user, role } = useSelector((state) => state.auth);
    const { loading, handleGenerateSlots } = useSlotApi();
    const { bookings, loading: bookingsLoading, error: bookingsError, getBookings } = useBookingApi();

    useEffect(() => {
        if (role === "therapist") {
            getBookings();
        }
    }, [role, getBookings]);

    if (!user || role !== "therapist") {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-6 py-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-10">
                        <WelcomeCard profile={user} role={role} />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Upcoming Sessions
                            </h2>

                            {bookingsLoading && <p>Loading bookings...</p>}
                            {bookingsError && <p className="text-red-500">{bookingsError}</p>}

                            {bookings && <BookingList bookings={bookings} />}
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        <TherapistProfile />
                        <CreateSlotForm apiFn={handleGenerateSlots} loading={loading} />
                    </div>
                </div>
            </motion.main>
        </div>
    );
}
