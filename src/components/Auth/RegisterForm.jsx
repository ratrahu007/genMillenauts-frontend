// src/components/Auth/RegisterForm.jsx
// This component provides a form for completing user registration.
// It's designed to be used after an initial step (like OTP verification) where the user's email is collected.
// The form gathers additional details such as full name, username, city, mobile, and password.
// It uses `react-hook-form` for state management and leverages the `useAuthApi` hook to handle the registration API call.
// Upon successful registration, it displays a success message and automatically redirects the user to the login page.

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";

// RegisterForm component: A form to collect user details and finalize registration.
export default function RegisterForm({ email }) {
  // `react-hook-form` for form state management.
  const { register, handleSubmit, setValue } = useForm();
  
  // Custom hook for handling the registration API call.
  const { handleRegister, loading } = useAuthApi();
  
  // State to hold the newly registered user's data to display a success message.
  const [registeredUser, setRegisteredUser] = useState(null);
  
  const navigate = useNavigate();

  // Pre-fill the email field using the email prop passed from the parent component.
  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  // Handles form submission.
  const onSubmit = async (data) => {
    // Append the default role to the form data before sending.
    const payload = {
      ...data,
      role: "USER", 
    };

    console.log("REGISTER PAYLOAD:", payload);

    // Call the registration handler from the auth hook.
    const response = await handleRegister(payload, null);

    // If registration is successful, show a success message and redirect.
    if (response.success) {
      toast.success("Registration Successful 🎉");
      setRegisteredUser(response.data); // Store user data to show a personalized welcome.
      // Redirect to the login page after a delay.
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
        // Display the registration form if the user is not yet registered.
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          {/* ... other input fields for username, city, mobile, and password ... */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
            readOnly // Email is pre-filled and not editable.
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
        // Display a success message after successful registration.
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