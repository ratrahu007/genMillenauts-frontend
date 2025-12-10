// src/components/dashboard/AddAlertContactForm.jsx
// This component provides a form for users to add a new "alert contact."
// An alert contact is a trusted person (e.g., family member, friend) who can be notified in case of an emergency.
// The form collects the contact's name, phone number, and relationship to the user.
// It uses Framer Motion for subtle animations, provides loading and success states,
// and communicates with the backend via the `addAlertContact` service.
// Upon successful submission, it displays a success message and redirects the user back to the dashboard.

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Users, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { addAlertContact } from "../../services/userService";

// AddAlertContactForm component: A form for adding a new emergency alert contact.
const AddAlertContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Retrieves the authentication token from the Redux store.
  const { token } = useSelector((state) => state.auth);
  
  // State to manage loading, success status, and form data.
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relation: "",
  });

  // Updates form state as the user types.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);
    try {
      // Formats the phone number to include the country code before sending.
      const contactData = {
        ...formData,
        phone: `+91${formData.phone}`,
      };
      // Calls the API service to add the contact.
      await addAlertContact(token, contactData);
      
      // On success, update UI state and show a confirmation toast.
      setLoading(false);
      setIsSuccess(true);
      toast.success("Alert contact added successfully!");
      
      // Redirect back to the dashboard after a short delay.
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to add alert contact.");
    }
  };

  return (
    // The form is animated with Framer Motion for a smooth entry effect.
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Each form field is also animated, appearing with a slight delay. */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="relative mt-1">
          {/* Icon inside the input field */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Enter name"
            required
          />
        </div>
      </motion.div>

      {/* Phone number input field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* ... similar structure for phone ... */}
      </motion.div>

      {/* Relation input field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* ... similar structure for relation ... */}
      </motion.div>

      {/* Submit button with loading and success states. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white transition-colors ${
            isSuccess
              ? "bg-green-500" // Success state style
              : "bg-red-600 hover:bg-red-700" // Default state style
          }`}
        >
          {loading ? (
            <Loader className="animate-spin h-5 w-5" /> // Loading spinner
          ) : isSuccess ? (
            <Check className="h-5 w-5" /> // Success checkmark
          ) : (
            "Add Contact" // Default text
          )}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default AddAlertContactForm;