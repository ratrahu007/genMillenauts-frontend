import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTherapistApi } from "../hooks/useTherapistApi";
import AuthCard from "../components/Auth/AuthCard";
import { toast } from "sonner";
import vid from "../assets/AI_VID.mp4";
import { User, Briefcase, Building, DollarSign, Info, Lock, Eye, EyeOff } from "lucide-react";

const fadeSlide = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const InputField = ({ icon, placeholder, name, value, onChange, required, type = "text", as = "input", togglePassword, showPassword }) => {
  const commonProps = {
    name,
    placeholder,
    required,
    value,
    onChange,
    type,
    className: "w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition",
  };
  const AsComponent = as;
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">{icon}</div>
      <AsComponent {...commonProps} />
      {name === 'password' && (
        <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white">
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
};

export default function TherapistRegisterPage() {
  const location = useLocation();
  const emailOrMobile = location.state?.emailOrMobile;
  const navigate = useNavigate();
  const { loading, register } = useTherapistApi();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    city: "",
    sessionPrice: "",
    bio: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrMobile) {
      toast.error("Session expired. Please start the signup process again.");
      navigate("/therapist/signup");
      return;
    }

    let payload = { ...formData };
    if (emailOrMobile.includes("@")) {
      payload.email = emailOrMobile;
    } else {
      payload.mobile = emailOrMobile;
    }

    try {
      await register(payload);
      toast.success("Registration complete! Welcome to the platform.");
      navigate("/therapist/login");
    } catch (error) {
      console.error("Registration failed from component:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={vid} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-900/50 to-teal-800/60 backdrop-blur-sm"></div>

      <motion.div key="register" {...fadeSlide} className="relative z-10">
        <AuthCard
          title="Create Your Professional Profile"
          subtitle="These details will be visible to clients seeking your expertise."
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<User />} name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} />
              <InputField icon={<Briefcase />} name="specialization" placeholder="Specialization" required value={formData.specialization} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<Building />} name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
              <InputField icon={<DollarSign />} name="sessionPrice" type="number" placeholder="Price per Session" required value={formData.sessionPrice} onChange={handleChange} />
            </div>
            <InputField icon={<Info />} name="bio" placeholder="A brief bio about your practice and experience" required value={formData.bio} onChange={handleChange} as="textarea" />
            <InputField 
              icon={<Lock />} 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={formData.password} 
              onChange={handleChange}
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-blue-400"
            >
              {loading ? "Finalizing Registration..." : "Complete Registration"}
            </button>
          </form>
        </AuthCard>
      </motion.div>
    </div>
  );
}
