// src/components/TherapistNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Heart, LayoutDashboard, Calendar, LogOut } from "lucide-react";

export default function TherapistNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="w-full px-6 lg:px-10">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-medium text-gray-900">GenMillenauts</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/therapist/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                            <LayoutDashboard className="w-5 h-5 mr-2" />
                            Dashboard
                        </Link>
                        <Link to="/therapist/slots" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                            <Calendar className="w-5 h-5 mr-2" />
                            My Slots
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}