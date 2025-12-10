// src/components/dashboard/AiCompanion.jsx
// This component implements a real-time chat interface for the "AI Companion" feature.
// It allows users to have a conversation with an AI, sending messages and receiving responses.
// Key functionalities include:
// - A welcome message to initiate the conversation.
// - A scrollable chat window that automatically scrolls to the latest message.
// - User input handling for sending messages (via button click or Enter key).
// - Asynchronous communication with an AI service (`chatWithAi`) to get responses.
// - Loading indicators while waiting for the AI's reply.
// - Error handling for failed API calls.
// - Animated UI elements using Framer Motion for a polished user experience.

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader, Sparkles } from "lucide-react";
import { chatWithAi } from "../../services/aiService";
import { toast } from "sonner";

// AiCompanion component: A chat interface for interacting with an AI.
const AiCompanion = () => {
  const { token } = useSelector((state) => state.auth);
  // State to store the conversation history.
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I'm your AI companion. Feel free to share what's on your mind. I'm here to listen without judgment.",
    },
  ]);
  // State for the user's current input message.
  const [input, setInput] = useState("");
  // State to manage the loading status while waiting for an AI response.
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Automatically scrolls the chat window down when new messages are added.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handles sending a message from the user to the AI.
  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat history.
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call the AI service to get a response.
      const aiResponse = await chatWithAi(token, input);
      const botMessage = { role: "bot", content: aiResponse.reply };
      // Add the AI's response to the chat history.
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("AI is not feeling well. Please try again later.");
      // Provide a fallback message in case of an API error.
      const botMessage = {
        role: "bot",
        content: "Sorry, I'm having a little trouble connecting right now. Let's try again in a moment.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Allows sending a message by pressing the Enter key.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  
  return (
    <motion.div
      // ... Framer Motion animation props ...
      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200">
        {/* ... */}
      </div>

      {/* Chat Messages Container */}
      <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto">
        <AnimatePresence>
          {/* Renders each message in the chat history with animations. */}
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              // ... animation props ...
              className={`flex items-start gap-3 my-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Bot or User icon */}
              {/* ... */}
              {/* Message bubble with different styling for user and bot. */}
              <div className={`p-3 rounded-xl max-w-md shadow-sm ${
                  msg.role === "user" ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-800"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {/* Loading indicator when waiting for the bot's response. */}
          {loading && (
            <motion.div /* ... */>
              {/* ... "Thinking..." indicator ... */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Chat Input Area */}
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className="flex-grow p-2 border rounded-lg"
        />
        <motion.button
          // ... animation props ...
          onClick={handleSend}
          disabled={loading}
          className="ml-3 p-2 bg-teal-500 text-white rounded-lg"
        >
          <Send />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AiCompanion;