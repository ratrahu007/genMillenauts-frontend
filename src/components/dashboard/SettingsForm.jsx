import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, selectUser } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";
import { Check, Loader } from "lucide-react";
import { toast } from "sonner";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { loading, error } = useSelector((state) => state.auth);

  const [city, setCity] = useState("");
  const [isOptedForOfflineMeets, setIsOptedForOfflineMeets] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setCity(user.city || "");
      setIsOptedForOfflineMeets(user.isOptedForOfflineMeets || false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    const result = await dispatch(updateUser({ city, isOptedForOfflineMeets }));
    if (updateUser.fulfilled.match(result)) {
      setIsSuccess(true);
      toast.success("Settings updated successfully!");
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error(error || "Failed to update settings.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          placeholder="Enter your city"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center"
      >
        <input
          id="isOptedForOfflineMeets"
          type="checkbox"
          checked={isOptedForOfflineMeets}
          onChange={(e) => setIsOptedForOfflineMeets(e.target.checked)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="isOptedForOfflineMeets" className="ml-3 block text-sm text-gray-900">
          Opt-in for offline meets
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${
            isSuccess
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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