import api from "./api";

export const chatWithAi = async (token, userId, message, provider = "azure") => {
  const response = await api.post(
    `/ai/chat`,
    { userId, message, provider },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


