// src/components/dashboard/TherapistProfile.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Award, Edit } from "lucide-react";
import { useSelector } from "react-redux";

const InfoPill = ({ icon, text }) => (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
        {icon}
        <span className="ml-2 text-sm text-gray-700">{text}</span>
    </div>
);

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
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div className="p-8">
                <div className="flex items-center space-x-6">
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 110 }}
                        src={therapist.profilePhotoUrl || "https://placehold.co/150"}
                        alt={therapist.fullName}
                        className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-800">{therapist.fullName}</h1>
                            <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                <Award className="w-4 h-4 mr-1" />
                                Verified
                            </div>
                        </div>
                        <p className="mt-1 text-gray-600">{therapist.specialization}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">About Me</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {therapist.bio || "I am dedicated to helping people heal, grow emotionally, and find clarity."}
                    </p>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoPill icon={<Mail className="w-5 h-5 text-teal-600" />} text={therapist.email} />
                        <InfoPill icon={<Phone className="w-5 h-5 text-teal-600" />} text={therapist.mobile} />
                        <InfoPill icon={<MapPin className="w-5 h-5 text-teal-600" />} text={therapist.city} />
                        <InfoPill icon={<Award className="w-5 h-5 text-teal-600" />} text={`${therapist.sessionPrice} / session`} />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 transition text-white px-7 py-3 rounded-full font-semibold shadow-md"
                    >
                        <Edit className="w-5 h-5 mr-2" />
                        Edit Profile
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default TherapistProfile;