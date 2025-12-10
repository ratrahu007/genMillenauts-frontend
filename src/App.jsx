import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import TherapistSection from "./components/TherapistSection";
import CommunitySection from "./components/CommunitySection";
import AiCheckInSection from "./components/AiCheckInSection";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import DashboardPage from "./pages/DashBoardPage";
import TherapistSignupPage from "./pages/TherapistSignupPage";
import TherapistRegisterPage from "./pages/TherapistRegisterPage";
import TherapistDashboardPage from "./pages/TherapistDashboardPage";
import TherapistLoginPage from "./pages/TherapistLoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required import
import { Toaster } from "sonner";
import SettingsPage from "./pages/SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { analyzeStress } from "./redux/slices/stressSlice";
import { authSuccess } from "./redux/slices/authSlice";

import AddAlertContactPage from "./pages/AddAlertContactPage";
import AlertContactsPage from "./pages/AlertContactsPage";
import TherapistSlotsPage from "./pages/TherapistSlotsPage";
import TherapistsPage from "./pages/TherapistsPage";
import TherapistSlotsBookingPage from "./pages/TherapistSlotsBookingPage";
import AvailableSlotsPage from "./pages/AvailableSlotsPage";

function App() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);
-
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      dispatch(authSuccess(JSON.parse(auth)));
    }
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (token) {
      interval = setInterval(() => {
        dispatch(analyzeStress());
      }, 2 * 60 * 1000); // 2 minutes
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && location.pathname === "/") {
      if (role === "therapist") {
        navigate("/therapist/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token, role, navigate, location]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar />

      <Routes>
        {/* Homepage with all sections */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeatureSection />
              <TherapistSection />
              <CommunitySection />
              <AiCheckInSection />
            </>
          }
        />

        {/* User Authentication */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/slots" element={<AvailableSlotsPage />} />

        {/* Therapist Authentication */}
        <Route path="/therapist/signup" element={<TherapistSignupPage />} />
        <Route
          path="/therapist/register"
          element={<TherapistRegisterPage />}
        />
        <Route path="/therapist/login" element={<TherapistLoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-alert-contact"
          element={
            <ProtectedRoute>
              <AddAlertContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alert-contacts"
          element={
            <ProtectedRoute>
              <AlertContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapists"
          element={
            <ProtectedRoute>
              <TherapistsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapists/:therapistId/slots"
          element={
            <ProtectedRoute>
              <TherapistSlotsBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapist/dashboard"
          element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapist/slots"
          element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistSlotsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
export default App;
