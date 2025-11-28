// src/components/Auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function ProtectedRoute({ children, requiredRole }) {
  // USER auth (Redux)
  const { token, role: userRole } = useSelector((state) => state.auth);

  // Determine the correct login path
  const loginPath = requiredRole === "THERAPIST" ? "/therapist/login" : "/login";

  // 🔒 If no token at all → BLOCK
  if (!token) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to={loginPath} replace />;
  }

  // 🔐 If a specific role is required → check it
  if (requiredRole && userRole !== requiredRole) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to={loginPath} replace />;
  }

  return children;
}
