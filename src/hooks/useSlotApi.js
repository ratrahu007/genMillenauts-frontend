// src/hooks/useSlotApi.js
import { useDispatch, useSelector } from "react-redux";
import { generateSlots, fetchSlots } from "../redux/slices/slotSlice";
import { getSlotsByTherapistId, fetchAllPublicSlots } from "../services/slotService";
import { useState, useCallback } from "react";
import { toast } from "sonner";


export const useSlotApi = () => {
  const dispatch = useDispatch();
  const { loading: reduxLoading, error: reduxError } = useSelector((state) => state.slots);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);


  const handleGenerateSlots = async (slotData) => {
    return dispatch(generateSlots(slotData));
  };

  const handleFetchSlots = useCallback(() => {
    dispatch(fetchSlots());
  }, [dispatch]);

  const handleFetchSlotsByTherapist = useCallback(async (therapistId) => {
    setLoading(true);
    try {
      const response = await getSlotsByTherapistId(therapistId);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch slots.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchAllPublicSlots = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllPublicSlots();
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch all public slots.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading: loading || reduxLoading, error: reduxError, handleGenerateSlots, handleFetchSlots, handleFetchSlotsByTherapist, handleFetchAllPublicSlots };
};
