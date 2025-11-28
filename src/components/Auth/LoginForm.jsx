// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../hooks/useAuthApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { handleLogin, loading } = useAuthApi();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const res = await handleLogin(data.email, data.password);
    if (res.success) {
      // ✅ redirect after successful login
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg p-6 rounded-2xl w-96"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        disabled={loading}
        className="w-full mb-3 p-2 border rounded-md"
      />

      <div className="relative w-full mb-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: true })}
          disabled={loading}
          className="w-full p-2 border rounded-md pr-10"
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-3">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
