// src/components/dashboard/SlotList.jsx
// This component is responsible for displaying a list of appointment slots for the therapist.
// It fetches slot data using the `useSlotApi` custom hook, groups the slots by date,
// and displays them in a clear, organized manner.

import React, { useEffect } from "react";
import { useSlotApi } from "../../hooks/useSlotApi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

// Utility function to format time
const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return format(date, "h:mm a");
};

// SlotItem component: Renders a single slot in the list.
const SlotItem = ({ slot, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between"
    >
        <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
                <p className="font-semibold text-gray-800">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </p>
            </div>
        </div>
        <div>
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    slot.booked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                }`}
            >
                {slot.booked ? "Booked" : "Available"}
            </span>
        </div>
    </motion.div>
);

// SlotList component: The main component that fetches and displays the list of slots.
export default function SlotList() {
    const { handleFetchSlots } = useSlotApi();
    const { slots, loading: slotsLoading } = useSelector((state) => state.slots);

    useEffect(() => {
        handleFetchSlots();
    }, [handleFetchSlots]);

    if (slotsLoading) {
        return <div className="text-center p-10">Loading slots...</div>;
    }

    if (!slots || slots.length === 0) {
        return <div className="text-center p-10">No slots found.</div>;
    }

    // Group slots by date
    const groupedSlots = slots.reduce((acc, slot) => {
        const date = slot.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
    }, {});

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Slots</h2>
            <div className="space-y-8">
                {Object.keys(groupedSlots).map((date) => (
                    <div key={date}>
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                {format(parseISO(date), "EEEE, MMMM do")}
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {groupedSlots[date].map((slot, index) => (
                                <SlotItem key={slot.id} slot={slot} index={index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}