// src/components/Auth/common/AuthBackground.jsx

// This component provides a visually rich and consistent background for all authentication-related pages (e.g., login, signup).
// It features a looping background video with a semi-transparent gradient overlay,
// creating a modern and immersive backdrop that enhances the user experience without distracting from the main content.
// The component is designed to wrap around the primary content (like a login or signup card), which is passed as `children`.

import React from "react";
import vid from "../../../assets/AI_VID.mp4"; // Imports the background video file.

// AuthBackground component: A full-screen container with a video background and gradient overlay.
const AuthBackground = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      {/* Background video element */}
      <video
        autoPlay  // Starts playing the video automatically.
        loop      // Loops the video indefinitely.
        muted     // Mutes the video to comply with browser autoplay policies.
        playsInline // Ensures the video plays inline on mobile devices.
        className="absolute inset-0 w-full h-full object-cover z-0" // Stretches to cover the entire screen.
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Semi-transparent gradient overlay */}
      {/* This sits on top of the video to add color and improve text readability over the video. */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-teal-900/50 backdrop-blur-sm z-10"></div>

      {/* Main Content Area */}
      {/* The `children` (e.g., the AuthCard with the form) are placed here, centered on the page. */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;