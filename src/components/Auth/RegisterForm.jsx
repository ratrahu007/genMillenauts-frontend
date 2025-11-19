// src/components/Auth/RegisterForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";

export default function RegisterForm({ email }) {
  const { register, handleSubmit, setValue } = useForm();
  const { handleRegister, loading } = useAuthApi();
  const [registeredUser, setRegisteredUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      role: "USER", // default user role
    };

    console.log("REGISTER PAYLOAD:", payload);

    const response = await handleRegister(payload, null);

    if (response.success) {
      toast.success("Registration Successful 🎉");
      setRegisteredUser(response.data); // backend returns user JSON
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  return (
    <AuthCard
      title="Complete Your Profile"
      subtitle="Just a few more details to get you started"
    >
      {!registeredUser ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            {...register("anyName", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Mobile (+91...)"
            {...register("mobile", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
            readOnly
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-blue-400"
          >
            {loading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-500 mb-3">
            Registration Successful!
          </h2>
          <p className="text-gray-300">
            Welcome, {registeredUser.fullName}!
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Redirecting you to login...
          </p>
        </div>
      )}
    </AuthCard>
  );
}
