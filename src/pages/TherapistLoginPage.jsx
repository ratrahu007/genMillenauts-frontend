import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginTherapist } from "../services/therapistService";

export default function TherapistLoginPage() {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginTherapist(formData);

      if (res.success) {
        toast.success(res.message || "Login successful!");

         localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role); 
        navigate("/therapist/dashboard");
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Therapist Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrMobile"
            placeholder="Email or Mobile"
            value={formData.emailOrMobile}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-blue-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
