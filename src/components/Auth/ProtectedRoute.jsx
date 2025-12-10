// src/components/Auth/ProtectedRoute.jsx
// This component acts as a gatekeeper for routes that require authentication and, optionally, a specific user role.
// It performs several critical checks before rendering its children (the protected content):
// 1. Checks for the presence of an authentication token in the Redux store.
// 2. Decodes the JWT to verify that it has not expired.
// 3. If a `requiredRole` is specified, it compares it against the user's role from the Redux store.
// If any of these checks fail, it logs the user out, displays an appropriate error toast,
// and redirects them to the relevant login page.

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { jwtDecode } from "../../utils/jwt";
import { logout } from "../../redux/slices/authSlice";

// ProtectedRoute component: Restricts access to routes based on authentication and user role.
export default function ProtectedRoute({ children, requiredRole }) {
  // Retrieve authentication state (token and role) from the Redux store.
  const { token, role: userRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Determine the correct login path based on the required role.
  const loginPath =
    requiredRole === "THERAPIST" ? "/therapist/login" : "/login";

  // 1. Check for the existence of a token.
  if (!token) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to={loginPath} replace />;
  }

  // 2. Check for token validity and expiration.
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds.

    // If the token's expiration time is in the past, the session is expired.
    if (decodedToken.exp < currentTime) {
      dispatch(logout()); // Clear the invalid session from Redux.
      toast.error("Your session has expired. Please log in again.");
      return <Navigate to={loginPath} replace />;
    }
  } catch (error) {
    // If the token is malformed or invalid, decoding will fail.
    dispatch(logout());
    toast.error("Invalid session. Please log in again.");
    return <Navigate to={loginPath} replace />;
  }

  // 3. Check if the user's role matches the required role for the route.
  if (requiredRole && userRole !== requiredRole) {
    toast.error("You do not have permission to access this page.");
    // Redirect to a default or role-specific login page.
    return <Navigate to={loginPath} replace />;
  }

  // If all checks pass, render the protected component.
  return children;
}