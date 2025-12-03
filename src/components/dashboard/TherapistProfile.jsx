import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSelector } from "react-redux";

const TherapistProfile = () => {
  const { user: therapist } = useSelector((state) => state.auth);

  if (!therapist) {
    return <div className="text-center p-10">No therapist data found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-md ml-10 my-10 px-4"
    >
      {/* Card */}
      <div className="bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden border border-gray-100">

        {/* Header Section */}
        <div className="relative h-44 bg-gradient-to-r from-teal-400 via-green-300 to-emerald-400 rounded-t-2xl">
          <img
            className="opacity-20 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format"
            alt=""
          />

          {/* Profile Image */}
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 110 }}
            src={therapist.profilePhotoUrl || "https://placehold.co/150"}
            alt={therapist.fullName}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl absolute left-8 -bottom-16"
          />
        </div>

        {/* Body */}
        <div className="px-8 pt-20 pb-10">
          {/* Name & Tags */}
          <h1 className="text-3xl font-extrabold text-gray-800">
            {therapist.fullName}
          </h1>

          <p className="mt-2 inline-block bg-teal-100 text-teal-700 text-sm px-3 py-1 rounded-full font-medium">
            {therapist.specialization}
          </p>

          {/* Contact Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h3>

            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3 text-teal-600" />
              <span>{therapist.email}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3 text-teal-600" />
              <span>{therapist.mobile}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3 text-teal-600" />
              <span>{therapist.city}</span>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
            <p className="mt-3 text-gray-600 leading-relaxed text-justify">
              {therapist.bio ||
                "I am dedicated to helping people heal, grow emotionally, and find clarity during difficult times."}
            </p>
          </div>

          {/* Book Button */}
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-teal-600 hover:bg-teal-700 transition text-white px-7 py-3 rounded-full text-lg font-semibold shadow-md shadow-teal-200"
            >
              Book a Healing Session
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TherapistProfile;
