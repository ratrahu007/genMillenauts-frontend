import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader, Sparkles } from "lucide-react";
import { chatWithAi } from "../../services/aiService";
import { toast } from "sonner";

const AiCompanion = () => {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I'm your AI companion. Feel free to share what's on your mind. I'm here to listen without judgment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await chatWithAi(token, input);
      const botMessage = { role: "bot", content: aiResponse.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("AI is not feeling well. Please try again later.");
      const botMessage = {
        role: "bot",
        content: "Sorry, I'm having a little trouble connecting right now. Let's try again in a moment.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

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
      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/80 w-full max-w-2xl mx-auto"
    >
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center">
            <Sparkles className="mr-2 text-teal-500" />
            <h2 className="text-xl font-semibold text-slate-800">
            AI Companion
            </h2>
        </div>
        <p className="text-sm text-slate-500 mt-1">Your safe space to talk</p>
      </div>
      <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto bg-white/50">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-3 my-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0">
                  <Bot size={20} />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-md shadow-sm ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <User size={20} />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start gap-3 my-4"
            >
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0">
                <Bot size={20} />
              </div>
              <div className="p-3 rounded-xl bg-slate-100 text-slate-800 flex items-center rounded-bl-none">
                <Loader className="animate-spin mr-2" size={20} />
                Thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 border-t border-slate-200 flex items-center bg-slate-50/80 rounded-b-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className="flex-grow p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={loading}
          className="ml-3 p-2 bg-teal-500 text-white rounded-lg disabled:bg-teal-300"
        >
          <Send />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AiCompanion;
