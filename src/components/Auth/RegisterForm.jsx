import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import { User, Mail, Lock, Building, Phone, AtSign, Eye, EyeOff, CheckSquare } from "lucide-react";

const InputField = ({ icon, placeholder, name, register, required, type = "text", readOnly = false, error, togglePassword, showPassword }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">{icon}</div>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { required })}
      readOnly={readOnly}
      className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 text-white border ${readOnly ? 'border-gray-600 cursor-not-allowed' : 'border-gray-700'} focus:ring-2 focus:ring-blue-500 focus:outline-none transition`}
    />
    {name === 'password' && (
      <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white">
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    )}
    {error && <p className="text-red-400 text-xs mt-1 ml-1">{error.message}</p>}
  </div>
);

export default function RegisterForm({ email }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      is_opted_for_online_meets: true // Default to true
    }
  });
  const { handleRegister, loading } = useAuthApi();
  const [registeredUser, setRegisteredUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) setValue("email", email);
  }, [email, setValue]);

  const onSubmit = async (data) => {
    const payload = { ...data, role: "USER" };
    const response = await handleRegister(payload, null);
    if (response.success) {
      toast.success("Registration Successful! Welcome aboard. 🎉");
      setRegisteredUser(response.data);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <AuthCard
      title="One Last Step"
      subtitle="Complete your profile to personalize your experience."
    >
      {!registeredUser ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<User />} placeholder="Full Name" name="fullName" register={register} required="Full name is required" error={errors.fullName} />
            <InputField icon={<AtSign />} placeholder="Username" name="userName" register={register} required="Username is required" error={errors.userName} />
          </div>
          <InputField icon={<User />} placeholder="Any Name" name="anyName" register={register} required="This name will be displayed" error={errors.anyName} />
          <InputField icon={<Phone />} placeholder="Mobile" name="mobile" register={register} required="Mobile number is required" error={errors.mobile} />
          <InputField icon={<Building />} placeholder="City" name="city" register={register} required="City is required" error={errors.city} />
          <InputField icon={<Mail />} placeholder="Email" name="email" register={register} required readOnly error={errors.email} />
          <InputField 
            icon={<Lock />} 
            placeholder="Password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            register={register} 
            required="Password is required" 
            error={errors.password}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="online-meets"
              {...register("is_opted_for_online_meets")}
              className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="online-meets" className="text-sm text-gray-300">
              I am open to online meetings
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-blue-400"
          >
            {loading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-3">
            Welcome, {registeredUser.fullName}!
          </h2>
          <p className="text-gray-300">
            Your account has been successfully created.
          </p>
          <p className="text-gray-400 text-sm mt-4 animate-pulse">
            Get ready, we're logging you in...
          </p>
        </div>
      )}
    </AuthCard>
  );
}
