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
import FormattedBotMessage from "./FormattedBotMessage";

// AiCompanion component: A chat interface for interacting with an AI.
const AiCompanion = () => {
  const { token, user } = useSelector((state) => state.auth);
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
      // Call the AI service to get a response, provider is hardcoded to "azure".
      const aiResponse = await chatWithAi(token, user.id, input, "azure");
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">AI Companion</h2>
            <p className="text-xs text-slate-500">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto">
        <AnimatePresence>
          {/* Renders each message in the chat history with animations. */}
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-3 my-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 flex-shrink-0 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-md shadow-sm ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {msg.role === "bot" ? (
                  <FormattedBotMessage content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 flex-shrink-0 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </motion.div>
          ))}
          {/* Loading indicator when waiting for the bot's response. */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 my-4 justify-start"
            >
              <div className="w-8 h-8 flex-shrink-0 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div className="p-3 rounded-xl max-w-md shadow-sm bg-slate-100 text-slate-800 flex items-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Responding...
              </div>
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
