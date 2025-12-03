// src/components/Auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { jwtDecode } from "../../utils/jwt";
import { logout } from "../../redux/slices/authSlice";

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, role: userRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginPath =
    requiredRole === "THERAPIST" ? "/therapist/login" : "/login";

  if (!token) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to={loginPath} replace />;
  }

  // Check for token expiration
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      dispatch(logout());
      toast.error("Your session has expired. Please log in again.");
      return <Navigate to={loginPath} replace />;
    }
  } catch (error) {
    // Handle potential decoding errors (e.g., invalid token)
    dispatch(logout());
    toast.error("Invalid session. Please log in again.");
    return <Navigate to={loginPath} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to={loginPath} replace />;
  }

  return children;
}
