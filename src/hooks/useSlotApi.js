// src/hooks/useSlotApi.js
import { useDispatch, useSelector } from "react-redux";
import { generateSlots, fetchSlots } from "../redux/slices/slotSlice";
import { useCallback } from "react";

export const useSlotApi = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.slots);

  const handleGenerateSlots = async (slotData) => {
    return dispatch(generateSlots(slotData));
  };

  const handleFetchSlots = useCallback(() => {
    dispatch(fetchSlots());
  }, [dispatch]);

  return { loading, error, handleGenerateSlots, handleFetchSlots };
};
