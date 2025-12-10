// src/components/dashboard/SlotList.jsx
// This component is responsible for displaying a list of available appointment slots.
// It fetches slot data using the `useSlotApi` custom hook and displays each slot
// as an interactive item. Users can book an available slot, which triggers a multi-step
// process involving a booking API call and a mock payment API call.
// The component provides feedback to the user throughout this process, showing
// loading states, success messages, and error notifications.

import React, { useEffect, useState } from "react";
import { useSlotApi } from "../../hooks/useSlotApi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { mockPayment } from "../../services/bookingService";
import { bookSlot } from "../../services/bookingService";

// Utility function to format a date string.
const formatDate = (date) => {
  // ... implementation ...
};

// Utility function to format a time string.
const formatTime = (time) => {
  // ... implementation ...
};

// SlotItem component: Renders a single slot in the list.
const SlotItem = ({ slot, index, onBook }) => (
  <motion.div
    // Animation for each list item.
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between"
  >
    <div className="flex items-center">
      {/* ... details like therapist name, date, and time ... */}
    </div>

    <div>
      {/* Displays "Booked" or "Available" status. */}
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          slot.booked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`}>
        {slot.booked ? "Booked" : "Available"}
      </span>
      {/* "Book" button is only shown for available slots. */}
      {!slot.booked && (
        <button
          onClick={() => onBook(slot.id)}
          className="ml-4 px-3 py-1 rounded-full text-sm font-semibold bg-teal-600 text-white"
        >
          Book
        </button>
      )}
    </div>
  </motion.div>
);

// SlotList component: The main component that fetches and displays the list of slots.
export default function SlotList() {
  const { handleFetchSlots } = useSlotApi();
  const { slots, loading: slotsLoading } = useSelector((state) => state.slots);
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // State to manage the booking process (loading, error, success).
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Fetches slots when the component mounts.
  useEffect(() => {
    handleFetchSlots();
  }, [handleFetchSlots]);

  // Handles the booking process when a user clicks the "Book" button.
  const handleBook = async (slotId) => {
    // ... validation and state updates ...

    try {
      // Step 1: Book the slot to get a booking ID.
      const bookingResponse = await bookSlot(user.id, slotId, token);
      const bookingId = bookingResponse.bookingId;
      
      // Step 2: Use the booking ID for the mock payment process.
      await mockPayment(bookingId, token);
      
      // On success, show a message and redirect.
      setBookingSuccess("Booking confirmed! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      // Handle errors from either the booking or payment step.
      setBookingError("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (slotsLoading) {
    return <div className="text-center p-10">Loading slots...</div>;
  }

  if (!slots || slots.length === 0) {
    return <div className="text-center p-10">No slots found.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Slots</h2>
      {/* Display loading, error, or success messages related to the booking process. */}
      {bookingLoading && <div className="text-center p-4">Booking in progress...</div>}
      {bookingError && <div className="text-center p-4 text-red-500">{bookingError}</div>}
      {bookingSuccess && <div className="text-center p-4 text-green-500">{bookingSuccess}</div>}
      
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <SlotItem
            key={slot.id}
            slot={slot}
            index={index}
            onBook={handleBook}
          />
        ))}
      </div>
    </div>
  );
}