import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import TherapistProfile from "../components/dashboard/TherapistProfile";
import CreateSlotForm from "../components/dashboard/CreateSlotForm";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import { useSlotApi } from "../hooks/useSlotApi";
import { motion } from "framer-motion";
import { useBookingApi } from "../hooks/useBookingApi";
import BookingList from "../components/dashboard/BookingList";
import { Heart, LogOut } from "lucide-react";

export default function TherapistDashboardPage() {
    const { user, role } = useSelector((state) => state.auth);
    const { loading, handleGenerateSlots } = useSlotApi();
    const { bookings, loading: bookingsLoading, error: bookingsError, getBookings } = useBookingApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "therapist") {
            getBookings();
        }
    }, [role, getBookings]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/therapist/login");
    };

    if (!user || role !== "therapist") {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
                <p className="mt-2 text-gray-600">You must be logged in as a therapist to view this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-12 gap-6"
                >
                    <section className="col-span-12 lg:col-span-8 space-y-6">
                        <WelcomeCard profile={user} role={role} />
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
                            {bookingsLoading && <p className="text-center p-10 text-gray-500">Loading bookings...</p>}
                            {bookingsError && <p className="text-red-500 text-center p-10">{bookingsError}</p>}
                            {bookings && <BookingList bookings={bookings} />}
                        </div>
                    </section>

                    <aside className="col-span-12 lg:col-span-4 space-y-6">
                        <TherapistProfile />
                        <CreateSlotForm apiFn={handleGenerateSlots} loading={loading} />
                    </aside>
                </motion.div>
            </main>
        </div>
    );
}
