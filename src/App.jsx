import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import TherapistSection from "./components/TherapistSection";
import CommunitySection from "./components/CommunitySection";
import AiCheckInSection from "./components/AiCheckInSection";
import Footer from "./components/Footer";
import SignupPage from "./pages/signUpPage";
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




function App() {
  return (
    <BrowserRouter>

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
              <Footer />
            </>
          }
        />
       
        {/* User Authentication */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Therapist Authentication */}
        <Route path="/therapist/signup" element={<TherapistSignupPage />} />
        <Route path="/therapist/register" element={<TherapistRegisterPage />} />
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
          path="/therapist/dashboard"
          element={
            <ProtectedRoute requiredRole="THERAPIST">
              <TherapistDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
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

    </BrowserRouter>
  );
}

export default App;
