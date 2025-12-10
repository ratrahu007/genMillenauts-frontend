// src/components/AiCheckInSection.jsx
// This component renders a comprehensive "AI Wellness Companion" section.
// It showcases a mock AI chat interface, personalized wellness suggestions, a weekly mood tracker,
// and key features of the AI service, all presented in a visually engaging and modern layout.

import {
  Sparkles,
  Send,
  Brain,
  Lightbulb,
  Calendar,
  TrendingUp,
  MessageCircle
} from "lucide-react";

// Mock data for the AI chat conversation.
const chatMessages = [
  { type: "ai", message: "Hi there! I'm here to check in with you. How are you feeling today?", time: "2:30 PM" },
  { type: "user", message: "I've been feeling a bit overwhelmed with work lately. It's hard to focus.", time: "2:31 PM" },
  { type: "ai", message: "I understand that work stress can be really challenging. Let's explore this together. Can you tell me what specifically is making you feel most overwhelmed?", time: "2:32 PM" },
  { type: "user", message: "I have too many deadlines and I feel like I can't catch up.", time: "2:33 PM" }
];

// Mock data for AI-generated personalized content.
const generatedContent = [
  { title: "Personalized Breathing Exercise", description: "5-minute guided breathing for work stress relief", icon: Lightbulb },
  { title: "Priority Setting Journal", description: "Structured prompts for organizing your tasks", icon: Calendar },
  { title: "Micro-break Reminders", description: "Gentle 2-minute breaks throughout your day", icon: MessageCircle }
];

// Mock data for the user's weekly mood trends.
const moodTrends = [
  { day: "Mon", mood: 6 }, { day: "Tue", mood: 5 }, { day: "Wed", mood: 7 },
  { day: "Thu", mood: 4 }, { day: "Fri", mood: 6 }, { day: "Sat", mood: 8 }, { day: "Sun", mood: 7 }
];

// AiCheckInSection component: A feature-rich section for AI-powered wellness check-ins.
export function AiCheckInSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-200 to-blue-100 text-blue-600 border border-blue-300 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Wellness Companion
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 bg-clip-text text-transparent">
              AI Check-in Partner
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chat with an empathetic AI, track your emotions, and receive personalized wellness tools designed to help you recharge and refocus.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Chat Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-lg rounded-2xl p-4 float-animation">
              
              {/* Chat Header */}
              <div className="flex items-center space-x-3 border-b border-blue-100 pb-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Wellness Chat</h3>
                  <p className="text-sm text-gray-500">Active • Reflecting your emotions</p>
                </div>
              </div>

              {/* Chat Messages Display */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gradient-to-r from-blue-500 to-sky-400 text-white'}`}>
                        {msg.type === 'user' ? 'U' : <Brain className="w-4 h-4" />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${msg.type === 'user' ? 'bg-blue-300 text-black-600' : 'bg-white border border-blue-100'}`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="mt-4 flex items-center space-x-3 border-t border-blue-100 pt-3">
                <input
                  type="text"
                  placeholder="Type your feelings..."
                  className="flex-1 rounded-full px-4 py-2 bg-white border border-blue-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm"
                />
                <button className="rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white w-10 h-10 flex items-center justify-center shadow-md hover:opacity-90 transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar with Tools and Insights */}
          <div className="space-y-6">
            
            {/* Personalized Suggestions Card */}
            <div className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-md rounded-2xl p-4 float-animation">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <span>Personalized Suggestions</span>
              </h4>
              {generatedContent.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start space-x-3 p-3 mb-2 bg-white/60 border border-blue-100 rounded-xl hover:shadow-sm transition">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-400 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Weekly Mood Chart Card */}
            <div className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-md rounded-2xl p-4 float-animation">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-sky-500" />
                  <span>Weekly Mood</span>
                </h4>
                <div className="px-2 py-1 bg-green-100 text-green-700 border border-green-300 text-xs rounded-full">
                  Improving
                </div>
              </div>
              <div className="flex justify-between items-end h-20">
                {/* Renders a bar chart based on mood data. */}
                {moodTrends.map((m, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1">
                    <div
                      className="w-3 bg-gradient-to-t from-blue-400 to-sky-300 rounded-t-md"
                      style={{ height: `${(m.mood / 10) * 100}%` }} // Height calculated based on mood value.
                    />
                    <span className="text-xs text-gray-500">{m.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">Avg mood: 6.1/10</p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col py-4 items-center border border-blue-200 hover:bg-blue-50 text-blue-600 rounded-xl transition bg-sky-200">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs mt-1">Start Check-in</span>
              </button>
              <button className="flex flex-col py-4 items-center border border-sky-200 hover:bg-sky-50 text-sky-600 rounded-xl transition bg-sky-200">
                <Calendar className="w-5 h-5" />
                <span className="text-xs mt-1">View Insights</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Highlight Row */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium">Empathetic AI</h4>
            <p className="text-sm text-gray-600">AI trained with therapeutic communication patterns.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
              <Lightbulb className="w-6 h-6 text-sky-600" />
            </div>
            <h4 className="font-medium">Personalized Content</h4>
            <p className="text-sm text-gray-600">Exercises and guidance built for your needs.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium">Progress Tracking</h4>
            <p className="text-sm text-gray-600">Track your mood and celebrate improvements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiCheckInSection;