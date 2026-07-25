// src/components/dashboard/CreateSlotForm.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Clock, Timer, ArrowRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Custom input for DatePicker
const CustomInput = React.forwardRef(({ value, onClick, icon, label }, ref) => (
    <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {icon}
            </div>
            <button type="button" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-left" onClick={onClick} ref={ref}>
                {value}
            </button>
        </div>
    </div>
));

export default function CreateSlotForm({ apiFn, loading }) {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            durationMinutes: 45,
        },
    });

    const onSubmit = async (data) => {
        const formattedData = {
            dayOfWeek: format(data.date, "EEEE").toUpperCase(),
            startTime: format(data.startTime, "HH:mm"),
            endTime: format(data.endTime, "HH:mm"),
            durationMinutes: parseInt(data.durationMinutes, 10),
        };

        try {
            await apiFn(formattedData);
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
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200"
        >
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-10 h-10 flex items-center justify-center rounded-xl mr-4">
                    <Calendar className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Generate Your Slots</h2>
                    <p className="text-sm text-gray-500">Select a date, time range, and session duration to create your availability.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="EEEE, MMMM d, yyyy"
                            customInput={<CustomInput icon={<Calendar className="w-5 h-5" />} label="Date" />}
                        />
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                customInput={<CustomInput icon={<Clock className="w-5 h-5" />} label="Start Time" />}
                            />
                        )}
                    />
                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                customInput={<CustomInput icon={<Clock className="w-5 h-5" />} label="End Time" />}
                            />
                        )}
                    />
                </div>

                <div>
                    <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                        Session Duration (minutes)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Timer className="w-5 h-5" />
                        </div>
                        <Controller
                            name="durationMinutes"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="durationMinutes"
                                    type="number"
                                    placeholder="e.g., 45"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                />
                            )}
                        />
                    </div>
                </div>

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
