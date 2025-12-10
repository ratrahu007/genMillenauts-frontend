// src/components/dashboard/SettingsForm.jsx
// This component provides a form for users to update their personal settings.
// Currently, it allows users to change their city and opt in or out of offline meetups.
// The form is pre-populated with the user's existing data from the Redux store.
// It uses Redux Toolkit's `createAsyncThunk` (`updateUser`) to handle the API call for updating the data.
// The component provides visual feedback for loading and success states and uses `sonner` for toast notifications.

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, selectUser } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";
import { Check, Loader } from "lucide-react";
import { toast } from "sonner";

// SettingsForm component: A form for updating user profile settings.
const SettingsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select user data and auth state (loading, error) from the Redux store.
  const user = useSelector(selectUser);
  const { loading, error } = useSelector((state) => state.auth);

  // Local state for form fields, initialized with user data.
  const [city, setCity] = useState("");
  const [isOptedForOfflineMeets, setIsOptedForOfflineMeets] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // For showing success UI on the button.

  // `useEffect` to populate the form with user data when the component mounts or user data changes.
  useEffect(() => {
    if (user) {
      setCity(user.city || "");
      setIsOptedForOfflineMeets(user.isOptedForOfflineMeets || false);
    }
  }, [user]);

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    
    // Dispatch the `updateUser` async thunk with the new settings data.
    const result = await dispatch(updateUser({ city, isOptedForOfflineMeets }));
    
    // Check if the thunk was fulfilled (i.e., the API call was successful).
    if (updateUser.fulfilled.match(result)) {
      setIsSuccess(true);
      toast.success("Settings updated successfully!");
      // Redirect to the dashboard after a short delay.
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      // If the thunk was rejected, show an error toast.
      toast.error(error || "Failed to update settings.");
    }
  };

  return (
    // The form and its fields are animated with Framer Motion.
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* City input field */}
      <motion.div /* ...animation props... */>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border rounded-lg"
          placeholder="Enter your city"
        />
      </motion.div>

      {/* Checkbox for opting into offline meets */}
      <motion.div /* ...animation props... */ className="flex items-center">
        <input
          id="isOptedForOfflineMeets"
          type="checkbox"
          checked={isOptedForOfflineMeets}
          onChange={(e) => setIsOptedForOfflineMeets(e.target.checked)}
          className="h-5 w-5 text-blue-600 rounded cursor-pointer"
        />
        <label htmlFor="isOptedForOfflineMeets" className="ml-3 block text-sm text-gray-900">
          Opt-in for offline meets
        </label>
      </motion.div>

      {/* Submit button with loading and success states */}
      <motion.div /* ...animation props... */>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white transition-colors ${
            isSuccess ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : isSuccess ? (
            <Check className="h-5 w-5" />
          ) : (
            "Save Changes"
          )}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default SettingsForm;
