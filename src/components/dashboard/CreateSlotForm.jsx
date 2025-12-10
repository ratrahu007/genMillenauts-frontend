// src/components/dashboard/CreateSlotForm.jsx
// This component provides a form for therapists to generate their available time slots for a specific day of the week.
// It allows them to define a start time, an end time, and the duration of each session.
// The component is designed to be reusable, taking an `apiFn` prop to handle the actual API call for slot creation.
// It uses `react-hook-form` for efficient form management, `sonner` for toast notifications,
// and `framer-motion` for smooth animations, enhancing the overall user experience.

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Clock, Timer, ArrowRight } from "lucide-react";

// An array defining the days of the week, used to populate the day selection dropdown.
const daysOfWeek = [
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
];

// A reusable InputField component to maintain a consistent style for all form inputs.
// It includes an icon, label, and standard input properties.
const InputField = ({ icon, id, label, register, registerOptions, ...rest }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      id={id}
      {...register(id, { required: true, ...registerOptions })}
      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      {...rest}
    />
  </div>
);

// CreateSlotForm component: The main form for generating appointment slots.
export default function CreateSlotForm({ apiFn, loading }) {
  // `react-hook-form` provides functions for form state management and submission.
  const { register, handleSubmit, reset } = useForm();

  // Handles form submission.
  const onSubmit = async (data) => {
    try {
      // Calls the API function passed via props with the form data.
      await apiFn(data);
      toast.success("Slots created successfully!");
      reset(); // Clears the form fields after successful submission.
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create slots.");
    }
  };

  return (
    <motion.div
      // Animation for the form container.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-10 h-10 flex items-center justify-center rounded-xl mr-4">
          <Calendar className="text-white w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Generate Your Slots</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Day of the Week Selection */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 pointer-events-none text-gray-400">
            <Calendar className="w-5 h-5" />
          </div>
          <select
            id="dayOfWeek"
            {...register("dayOfWeek", { required: true })}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg appearance-none"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* Start Time Input */}
        <InputField
          icon={<Clock className="w-5 h-5" />}
          id="startTime"
          type="time"
          register={register}
        />

        {/* End Time Input */}
        <InputField
          icon={<Clock className="w-5 h-5" />}
          id="endTime"
          type="time"
          register={register}
        />

        {/* Duration Input */}
        <InputField
          icon={<Timer className="w-5 h-5" />}
          id="durationMinutes"
          type="number"
          placeholder="e.g., 45"
          register={register}
          registerOptions={{ valueAsNumber: true }} // Ensures the value is treated as a number.
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-semibold transition-all"
        >
          {loading ? "Creating..." : (
            <>
              Generate Slots
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}