// src/components/dashboard/TherapistProfile.jsx
// This component is designed to display a detailed profile card for a therapist.
// It retrieves the logged-in therapist's data directly from the Redux store (`state.auth.user`).
// The card includes a header with a background and profile image, contact information (email, phone, city),
// a biography section, and a call-to-action button. The component uses Framer Motion
// to create engaging animations for the card and profile image, enhancing the visual presentation.

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSelector } from "react-redux";

// TherapistProfile component: A detailed profile view for a therapist.
const TherapistProfile = () => {
  // Retrieves the therapist's data from the Redux store, assuming the logged-in user is the therapist.
  const { user: therapist } = useSelector((state) => state.auth);

  // If no therapist data is found, display a fallback message.
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
      {/* The main profile card container. */}
      <div className="bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden border">

        {/* Card Header with background image and profile picture. */}
        <div className="relative h-44 bg-gradient-to-r from-teal-400 to-emerald-400">
          <img
            className="opacity-20 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format"
            alt=""
          />

          {/* Therapist's Profile Image, animated to pop in. */}
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 110 }}
            src={therapist.profilePhotoUrl || "https://placehold.co/150"}
            alt={therapist.fullName}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl absolute left-8 -bottom-16"
          />
        </div>

        {/* Card Body containing all textual information. */}
        <div className="px-8 pt-20 pb-10">
          {/* Name and Specialization */}
          <h1 className="text-3xl font-extrabold text-gray-800">
            {therapist.fullName}
          </h1>
          <p className="mt-2 inline-block bg-teal-100 text-teal-700 text-sm px-3 py-1 rounded-full">
            {therapist.specialization}
          </p>

          {/* Contact Information Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3 text-teal-600" />
              <span>{therapist.email}</span>
            </div>
            {/* ... other contact details ... */}
          </div>

          {/* About Me Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
            <p className="mt-3 text-gray-600 leading-relaxed text-justify">
              {therapist.bio || "I am dedicated to helping people heal, grow emotionally, and find clarity."}
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-teal-600 hover:bg-teal-700 transition text-white px-7 py-3 rounded-full font-semibold shadow-md"
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