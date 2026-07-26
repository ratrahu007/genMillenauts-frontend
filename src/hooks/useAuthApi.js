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
    dispatch(startLoading());
    try {
      const data = await sendOtp(email);
      const success = data?.success === true;
      const message = data?.message || "Failed to send OTP";
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
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
    dispatch(startLoading());
    try {
      const responseData = await verifyOtpService(emailOrMobile, otp);
      
      if (responseData?.success !== true) {
        const message = responseData?.message || "OTP verification failed";
        toast.error(message);
        throw new Error(message);
      }

      const message = responseData?.message || "OTP verified successfully";
      toast.success(message);
      return { success: true, message };
    } catch (err) {
      const message = err.message || err.response?.data?.message || "Failed to verify OTP";
      dispatch(setError(message));
      throw err;
    } finally {
      dispatch(resetLoading());
    }
  };

 const handleRegister = async (payload) => {
  try {
    dispatch(startLoading());

    const response = await registerUser(payload);
    const data = response.data;

    if (response.status >= 400) {
      const message =
        data?.message || "Registration failed. Please try again.";
      toast.error(message);
      dispatch(setError(message));
      return { success: false, message };
    }

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

      const loginRes = await loginUser(email, password);

      if (loginRes?.token) {
        toast.success("Login successful!");

        const profile = await getMyProfile(loginRes.token);

        dispatch(
          authSuccess({
            token: loginRes.token,
            role: loginRes.role,
            user: profile,
          })
        );

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
