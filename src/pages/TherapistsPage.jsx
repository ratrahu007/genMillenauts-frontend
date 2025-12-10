import React, { useEffect, useState } from "react";
import { useTherapistApi } from "../hooks/useTherapistApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, ArrowRight } from "lucide-react";

const TherapistCard = ({ therapist, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
              src={therapist.profilePicture || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
              alt={therapist.fullName}
            />
             <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-white"></span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{therapist.fullName}</h3>
            <p className="text-sm text-gray-500">{therapist.specialization}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-3 text-blue-400" />
            <span>{therapist.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-3 text-blue-400" />
            <span>{therapist.mobile}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-3 text-blue-400" />
            <span>{therapist.yearsOfExperience} years of experience</span>
          </div>
        </div>

        <Link
          to={`/therapists/${therapist.id}/slots`}
          className="group inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          View Available Slots
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};


export default function TherapistsPage() {
  const { fetchAllTherapists, loading } = useTherapistApi();
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const getTherapists = async () => {
      try {
        const data = await fetchAllTherapists();
        setTherapists(data);
      } catch (error) {
        console.error("Failed to fetch therapists", error);
      }
    };
    getTherapists();
  }, [fetchAllTherapists]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };
  
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "circOut" }}
            className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Meet Our <span className="text-blue-600">Therapists</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find the right professional to support you on your mental wellness journey.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500">Loading therapists...</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {therapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} variants={itemVariants} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
