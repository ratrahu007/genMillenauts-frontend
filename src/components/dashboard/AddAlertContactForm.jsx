// src/components/dashboard/AddAlertContactForm.jsx
// This component provides a form for users to add a new "alert contact."

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Users, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { addAlertContact } from "../../services/userService";

const AddAlertContactForm = () => {
  const navigate = useNavigate();

  // Authentication token
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relation: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setIsSuccess(false);

    try {
      const phone = formData.phone.trim();

      const contactData = {
        name: formData.name.trim(),
        relation: formData.relation.trim(),
        phone: phone.startsWith("+91") ? phone : `+91${phone}`,
      };

      await addAlertContact(token, contactData);

      setIsSuccess(true);
      toast.success("Alert contact added successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Failed to add alert contact.");
    } finally {
      setLoading(false);
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
      {/* Name */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>

        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            maxLength={10}
            pattern="[0-9]{10}"
            required
            className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </motion.div>

      {/* Relation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label
          htmlFor="relation"
          className="block text-sm font-medium text-gray-700"
        >
          Relation
        </label>

        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            id="relation"
            value={formData.relation}
            onChange={handleChange}
            placeholder="Father, Friend, Sister..."
            required
            className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <button
          type="submit"
          disabled={loading || isSuccess}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white transition-colors ${
            isSuccess
              ? "bg-green-500"
              : "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
          }`}
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : isSuccess ? (
            <Check className="h-5 w-5" />
          ) : (
            "Add Contact"
          )}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default AddAlertContactForm;