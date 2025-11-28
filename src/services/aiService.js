import axios from "axios";

const API_URL = "http://localhost:8080/api/ai";

export const chatWithAi = async (token, message) => {
  const response = await axios.post(
    `${API_URL}/chat`,
    { message },
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
  onComplete
) => {
  const response = await fetch(`${API_URL}/chat-stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
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
