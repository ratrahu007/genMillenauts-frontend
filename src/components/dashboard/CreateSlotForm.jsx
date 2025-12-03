// src/components/dashboard/CreateSlotForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Clock, Timer, ArrowRight } from "lucide-react";

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const InputField = ({ icon, id, label, register, registerOptions, ...rest }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      id={id}
      {...register(id, { required: true, ...registerOptions })}
      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      {...rest}
    />
  </div>
);

export default function CreateSlotForm({ apiFn, loading }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiFn(data);
      toast.success("Slots created successfully!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create slots.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-10 h-10 flex items-center justify-center rounded-xl shadow-md mr-4">
          <Calendar className="text-white w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Generate Your Slots</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Calendar className="w-5 h-5" />
          </div>
          <select
            id="dayOfWeek"
            {...register("dayOfWeek", { required: true })}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition appearance-none"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <InputField
          icon={<Clock className="w-5 h-5" />}
          id="startTime"
          label="Start Time"
          type="time"
          register={register}
        />

        <InputField
          icon={<Clock className="w-5 h-5" />}
          id="endTime"
          label="End Time"
          type="time"
          register={register}
        />

        <InputField
          icon={<Timer className="w-5 h-5" />}
          id="durationMinutes"
          label="Duration (minutes)"
          type="number"
          placeholder="e.g., 45"
          register={register}
          registerOptions={{ valueAsNumber: true }}
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-lg text-white font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            "Creating..."
          ) : (
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
