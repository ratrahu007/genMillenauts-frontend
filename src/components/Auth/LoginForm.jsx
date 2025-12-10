// src/components/Auth/LoginForm.jsx
// This component provides a user interface for logging into the application.
// It includes fields for email and password, with a feature to toggle password visibility.
// The form uses `react-hook-form` for efficient state management and validation,
// and it communicates with the authentication API via the `useAuthApi` custom hook.
// It provides user feedback during the login process (e.g., loading state) and handles redirection upon success.

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

// LoginForm component: A form for user authentication.
export default function LoginForm() {
  // `react-hook-form` for form state management and submission.
  const { register, handleSubmit } = useForm();
  
  // Custom hook for handling authentication API calls.
  // - `handleLogin`: Function to call the login API endpoint.
  // - `loading`: Boolean to indicate when the API call is in progress.
  const { handleLogin, loading } = useAuthApi();
  
  const navigate = useNavigate();
  
  // State to manage the visibility of the password field.
  const [showPassword, setShowPassword] = useState(false);

  // Toggles the visibility of the password text.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handles form submission.
  const onSubmit = async (data) => {
    // Calls the login handler from the auth hook with user credentials.
    const res = await handleLogin(data.email, data.password);
    
    // If login is successful, redirect to the user's dashboard after a short delay.
    if (res.success) {
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg p-6 rounded-2xl w-96"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      {/* Email Input Field */}
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })} // Registers the field with react-hook-form.
        disabled={loading} // Disables the input during the API call.
        className="w-full mb-3 p-2 border rounded-md"
      />

      {/* Password Input Field with Visibility Toggle */}
      <div className="relative w-full mb-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: true })}
          disabled={loading}
          className="w-full p-2 border rounded-md pr-10"
        />
        {/* Icon to toggle password visibility */}
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading} // Disables the button when the form is submitting.
        className={`w-full py-2 rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed" // Style for loading state.
            : "bg-blue-600 hover:bg-blue-700"  // Default style.
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Link to the signup page for new users. */}
      <p className="text-center text-sm text-gray-600 mt-3">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}