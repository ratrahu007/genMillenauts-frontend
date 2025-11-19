import React from "react";
import vid from "../../../assets/AI_VID.mp4";

const AuthBackground = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-teal-900/50 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;
