// src/pages/TherapistSlotsBookingPage.jsx
// This component provides a user interface for booking available therapy slots.
// It fetches and displays time slots for a specific therapist,
// allows users to book a slot, simulates a payment process, and provides feedback on the booking status.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSlotApi } from "../hooks/useSlotApi";
import { bookSlot, mockPayment } from "../services/bookingService";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

// TherapistSlotsBookingPage component: Handles the entire slot booking process for a single therapist.
export default function TherapistSlotsBookingPage() {
  // Extract therapist ID from URL parameters to identify which therapist's slots to fetch.
  const { therapistId } = useParams();

  // Custom hook to handle API calls for fetching slot data.
  // - `handleFetchSlotsByTherapist`: Function to fetch slots.
  // - `loading`: Boolean to indicate when data is being fetched.
  const { handleFetchSlotsByTherapist, loading } = useSlotApi();

  // State to store the list of available slots for the therapist.
  const [slots, setSlots] = useState([]);
  // State to track the booking status of each slot (e.g., "booking", "booked", "idle").
  const [bookingStatus, setBookingStatus] = useState({});

  // Retrieve authentication token and user data from the Redux store.
  const { token, user } = useSelector((state) => state.auth);

  // useEffect hook: Fetches the therapist's available slots when the component mounts or therapistId changes.
  useEffect(() => {
    const getSlots = async () => {
      try {
        // Fetch slots using the custom hook and update the state.
        const data = await handleFetchSlotsByTherapist(therapistId);
        setSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots", error);
        toast.error("Could not load available slots.");
      }
    };
    // Only fetch slots if a therapistId is available.
    if (therapistId) getSlots();
  }, [therapistId, handleFetchSlotsByTherapist]);

  // handleBooking: Manages the multi-step process of booking a slot.
  const handleBooking = async (slotId) => {
    // Set the status of the current slot to "booking" to show a loading state.
    setBookingStatus((prev) => ({ ...prev, [slotId]: "booking" }));

    try {
      // Step 1: Call the booking service to reserve the slot.
      // The backend returns a unique bookingId for the reservation.
      const bookingResponse = await bookSlot(therapistId, slotId, token);
      const bookingId = bookingResponse.bookingId;

      // Store the bookingId in local storage for later use (e.g., on the dashboard).
      localStorage.setItem("latestBookingId", bookingId);

      // Step 2: Simulate a payment process using a mock payment service.
      await mockPayment(bookingId, token);

      // Notify the user of successful payment.
      toast.success("Payment Success! Redirecting…");

      // Step 3: Redirect the user to their dashboard after a short delay.
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 600);

      // Update the slot status to "booked" to prevent re-booking.
      setBookingStatus((prev) => ({ ...prev, [slotId]: "booked" }));

    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");

      // If booking fails, reset the slot status to "idle".
      setBookingStatus((prev) => ({ ...prev, [slotId]: "idle" }));
    }
  };

  // Utility function to format a date string into a more readable format (e.g., "MMMM d, yyyy").
  const formatDate = (date) => {
    try {
      return format(new Date(date), "MMMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Utility function to format a time string into a standard 12-hour format (e.g., "h:mm a").
  const formatTime = (time) => {
    try {
      // Creates a valid Date object for formatting by providing a dummy date part.
      return format(new Date(`1970-01-01T${time}`), "h:mm a");
    } catch {
      return "Invalid time";
    }
  };

  // Render the booking page UI.
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Book a Session</h1>
          <p className="mt-4 text-xl text-gray-500">
            Choose an available time slot below.
          </p>
        </div>

        {/* Display a loading spinner while slots are being fetched. */}
        {loading && slots.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : slots.length > 0 ? (
          // If slots are available, display them in a list.
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-6 border-b pb-4">
              <Calendar className="w-8 h-8 text-blue-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                {/* Display the date for which the slots are available. */}
                Available Slots – {slots[0] && formatDate(slots[0].date)}
              </h2>
            </div>

            <ul className="space-y-4">
              {/* Map over the available slots and render each one as a list item. */}
              {slots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-gray-500 mr-3" />
                    <span className="font-semibold text-lg text-gray-700">
                      {/* Display the formatted start and end time for the slot. */}
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                  </div>

                  {/* Button to handle booking the slot. */}
                  <button
                    onClick={() => handleBooking(slot.id)}
                    // Disable the button if the slot is currently being booked or is already booked.
                    disabled={
                      bookingStatus[slot.id] === "booking" ||
                      bookingStatus[slot.id] === "booked"
                    }
                    className={`group inline-flex items-center justify-center px-6 py-2 font-semibold rounded-md w-full sm:w-auto transition-all ${
                      bookingStatus[slot.id] === "booked"
                        ? "bg-green-500 text-white cursor-not-allowed" // Style for a booked slot
                        : "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400" // Default booking style
                    }`}
                  >
                    {/* Show a spinner while the booking is in progress. */}
                    {bookingStatus[slot.id] === "booking" && (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    )}
                    {/* Change button text based on booking status. */}
                    {bookingStatus[slot.id] === "booked"
                      ? "Booked!"
                      : "Book Now"}
                    {/* Show an arrow icon for available slots. */}
                    {bookingStatus[slot.id] === "idle" ||
                    !bookingStatus[slot.id] ? (
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // If no slots are available, display a message.
          <p className="text-center text-gray-500 text-lg">
            No available slots for this therapist.
          </p>
        )}
      </div>
    </div>
  );
}