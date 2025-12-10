// src/components/Navbar.jsx
// This component renders the main navigation bar for the website.
// It is responsive and adjusts its layout for desktop and mobile views.
// Key features include:
// - A logo and brand name that navigates to the homepage.
// - Centered navigation links for desktop view.
// - Authentication-aware action buttons (Log In/Sign Up or Settings/Logout).
// - Dropdown menus for login and signup options to differentiate user roles (e.g., User vs. Therapist).
// - A collapsible mobile menu for smaller screens.
// - State management for mobile menu visibility and authentication status (via Redux).

import { useState, useRef } from "react";
import { Heart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginOptions from "./ui/LoginOptions";
import SignupOptions from "./ui/SignupOptions";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

// Navbar component: The primary, sticky navigation bar for the application.
export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get authentication token from the Redux store to determine user's login status.
  const { token } = useSelector((state) => state.auth);

  // State for toggling the mobile menu.
  const [isOpen, setIsOpen] = useState(false);
  // State for showing/hiding the login options dropdown.
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  // State for showing/hiding the signup options dropdown.
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  // Refs for detecting clicks outside the dropdown menus to close them.
  const loginOptionsRef = useRef(null);
  const signupOptionsRef = useRef(null);

  // Custom hooks to handle closing dropdowns when clicking outside of them.
  useOutsideClick(loginOptionsRef, () => setShowLoginOptions(false));
  useOutsideClick(signupOptionsRef, () => setShowSignupOptions(false));

  // Handles user logout by dispatching the logout action and redirecting to the homepage.
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          
          {/* Left Section: Logo and Brand Name */}
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-50 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" onClick={() => navigate("/")} />
            </div>
            <span className="text-xl font-medium text-gray-900">GenMillenauts</span>
          </div>

          {/* Center Section: Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <a href="/#features" className="text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="/#therapists" className="text-gray-500 hover:text-gray-900 transition-colors">
              Find Therapists
            </a>
            <a href="/#community" className="text-gray-500 hover:text-gray-900 transition-colors">
              Community
            </a>
            <a href="/#about" className="text-gray-500 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>

          {/* Right Section: Authentication Actions */}
          <div className="flex items-center justify-end space-x-4 flex-1">
            {token ? (
              // Displayed when the user is authenticated (logged in).
              <>
                <button
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:opacity-90 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              // Displayed when the user is not authenticated.
              <>
                {/* Login Button and Dropdown */}
                <div ref={loginOptionsRef}>
                  <button
                    className="hidden sm:inline-flex px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setShowLoginOptions((prev) => !prev)}
                  >
                    Log In
                  </button>
                  <AnimatePresence>
                    {showLoginOptions && <LoginOptions onSelect={() => setShowLoginOptions(false)} />}
                  </AnimatePresence>
                </div>

                {/* Sign Up Button and Dropdown */}
                <div ref={signupOptionsRef}>
                  <button
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:opacity-90 transition"
                    onClick={() => setShowSignupOptions((prev) => !prev)}
                  >
                    Sign Up
                  </button>
                  <AnimatePresence>
                    {showSignupOptions && <SignupOptions onSelect={() => setShowSignupOptions(false)} />}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white/90 backdrop-blur-md rounded-md p-4 shadow-lg">
            {/* Navigation links for mobile view. */}
            <a href="/#features" className="block text-gray-700 hover:text-gray-900">
              Features
            </a>
            {/* ... other links */}
            
            {/* Authentication actions for mobile view. */}
            {token ? (
              <>
                <button onClick={() => { setIsOpen(false); navigate("/settings"); }} className="block w-full text-left text-gray-700 hover:text-gray-900">
                  Settings
                </button>
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="block w-full text-left text-gray-700 hover:text-gray-900">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setIsOpen(false); setShowLoginOptions((prev) => !prev); }} className="block w-full text-left text-gray-700 hover:text-gray-900">
                  Log In
                </button>
                <button onClick={() => { setIsOpen(false); setShowSignupOptions((prev) => !prev); }} className="block w-full text-left text-gray-700 hover:text-gray-900">
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;