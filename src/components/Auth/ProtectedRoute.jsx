// src/components/Auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function ProtectedRoute({ children, requiredRole }) {
  // USER auth (Redux)
  const { token: reduxToken, role: reduxRole } = useSelector(
    (state) => state.auth
  );

  // THERAPIST auth (localStorage)
  const lsToken = localStorage.getItem("token");
  const lsRole = localStorage.getItem("role");

  // Select whichever auth is valid
  const token = reduxToken || lsToken;
  const userRole = reduxRole || lsRole;

  // 🔒 If no token at all → BLOCK
  if (!token) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to="/login" replace />;
  }

  // 🔐 If a specific role is required → check it
  if (requiredRole && userRole !== requiredRole) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
