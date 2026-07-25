import api from "./api";

export const chatWithAi = async (token, message, provider = "gemini") => {
  const response = await api.post(
    `/ai/chat`,
    { message, provider },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const chatWithAiStreaming = async (
  token,
  message,
  onChunk,
  onComplete,
  provider = "gemini"
) => {
  const response = await fetch(`https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api/ai/chat-stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, provider }),
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  const processText = async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        if (buffer) {
          onChunk(buffer);
        }
        onComplete();
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      onChunk(buffer);
      buffer = "";
    }
  };

  processText();
};
