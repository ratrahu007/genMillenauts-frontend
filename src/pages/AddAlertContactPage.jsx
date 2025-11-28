import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddAlertContactForm from "../components/dashboard/AddAlertContactForm";

const AddAlertContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Information */}
        <motion.div
          className="p-8 md:p-12 bg-red-600 text-white flex flex-col justify-between"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <ShieldAlert size={28} />
                <h1 className="text-3xl font-bold">Add Alert Contact</h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 bg-white/20 text-white hover:bg-white/30 transition-colors px-4 py-2 rounded-lg shadow-md"
              >
                <ArrowLeft size={20} />
                <span>Dashboard</span>
              </motion.button>
            </div>
            <p className="text-red-100">
              Add a trusted family member or friend to be notified in case of
              an emergency.
            </p>
          </div>
          <div className="mt-8 text-sm text-red-200">
            This person will receive an alert if you trigger the SOS feature.
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          className="p-8 md:p-12"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AddAlertContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default AddAlertContactPage;

