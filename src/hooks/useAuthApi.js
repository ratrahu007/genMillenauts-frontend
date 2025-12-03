// src/hooks/useAuthApi.js
import { useDispatch, useSelector } from "react-redux";
import { startLoading, resetLoading, setError,authSuccess } from "../redux/slices/authSlice";
import { sendOtp, verifyOtp as verifyOtpService, registerUser,loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



import { getMyProfile } from "../services/userService";




export const useAuthApi = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate(); 

  const handleSendOtp = async (email) => {
    try {
      dispatch(startLoading());
      const data = await sendOtp(email);
      const success = data?.success === true;
      const message = data?.message || "Failed to send OTP";
      if (success) toast.success(message);
      else toast.error(message);
      return { success, message };
    } catch (err) {
      toast.error("Failed to send OTP");
      dispatch(setError("Network error"));
      return { success: false, message: "Network error" };
    } finally {
      dispatch(resetLoading());
    }
  };

  const verifyOtp = async (data) => {
    const { emailOrMobile, otp } = data;
    try {
      dispatch(startLoading());
      const responseData = await verifyOtpService(emailOrMobile, otp);
      const success = responseData?.success === true;
      const message = responseData?.message || "OTP verification failed";
      if (success) toast.success(message);
      else toast.error(message);
      return { success, message };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to verify OTP";
      toast.error(message);
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(resetLoading());
    }
  };

 const handleRegister = async (payload) => {
  try {
    dispatch(startLoading());

    const response = await registerUser(payload);
    const data = response.data;

    // Log the backend response
    console.log("🧾 BACKEND JSON:", data);

    // ✅ Handle 4xx errors
    if (response.status >= 400) {
      const message =
        data?.message || "Registration failed. Please try again.";
      toast.error(message); // toast right here
      dispatch(setError(message));
      return { success: false, message };
    }

    // ✅ Success
    toast.success("User registered successfully");
    return { success: true, data };
  } catch (err) {
    const message =
      err.response?.data?.message || "Network error during registration";
    toast.error(message);
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(resetLoading());
  }
};


  const handleLogin = async (email, password) => {
    try {
      dispatch(startLoading());

      // ✅ Step 1: Login to get token
      const loginRes = await loginUser(email, password);

      if (loginRes?.token) {
        toast.success("Login successful!");

        // ✅ Step 2: Use that token to fetch full user profile
        const profile = await getMyProfile(loginRes.token);

        // ✅ Step 3: Save both token + full profile in Redux & localStorage
        dispatch(
          authSuccess({
            token: loginRes.token,
            role: loginRes.role,
            user: profile,
          })
        );

        // ✅ Step 4: Redirect to dashboard
        navigate("/dashboard");

        return { success: true, data: profile };
      } else {
        toast.error("Invalid credentials");
        return { success: false };
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password.";
      toast.error(message);
      dispatch(setError(message));
      return { success: false };
    } finally {
      dispatch(resetLoading());
    }
  };


  return { handleSendOtp, verifyOtp, handleRegister, loading ,handleLogin,

  };
};
