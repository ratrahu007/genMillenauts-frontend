// src/components/CommunitySection.jsx
// This component renders the "Community Support" section of the website.
// It is designed to highlight the platform's community features, including anonymous online "Peer Circles"
// and "Local Meetup Connections." It uses mock data to simulate real community groups and statistics,
// presenting them in a structured, user-friendly, and visually appealing manner.

import { 
  Users, 
  Shield, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Lock,
  Globe,
  Coffee,
  ArrowRight
} from "lucide-react";

// Mock data representing available online support groups.
const peerCircles = [
  {
    title: "Anxiety Support Circle",
    description: "A safe space to discuss anxiety, share coping strategies, and find understanding peers.",
    members: 324,
    activeNow: 23,
    category: "Mental Health",
    isAnonymous: true
  },
  {
    title: "New Parents Support",
    description: "Navigate the challenges of parenthood with others who understand the journey.",
    members: 156,
    activeNow: 12,
    category: "Life Changes",
    isAnonymous: true
  },
  {
    title: "Career Stress & Balance",
    description: "Discuss work-related stress, burnout, and finding healthy work-life balance.",
    members: 287,
    activeNow: 18,
    category: "Professional",
    isAnonymous: true
  }
];

// Mock data for local meetup interests in different cities.
const meetupInterests = [
  {
    city: "Mumbai",
    interests: ["Walking Groups", "Art Therapy", "Mindfulness"],
    members: 89
  },
  {
    city: "Delhi",
    interests: ["Book Club", "Yoga", "Coffee Chats"],
    members: 124
  },
  {
    city: "Bangalore",
    interests: ["Hiking", "Photography", "Board Games"],
    members: 76
  }
];

// CommunitySection component: Displays community features like peer circles and local meetups.
export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Community Support
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
              Support Community
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with others who understand your journey through anonymous online circles 
            and consensual local meetups designed for genuine support and connection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* Column for Online Peer Circles */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-400 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Anonymous Peer Circles</h3>
                <p className="text-sm text-gray-500">Safe, moderated online discussions</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Mapping through peerCircles data to display each support group. */}
              {peerCircles.map((circle, index) => (
                <div
                  key={index}
                  className="group bg-white/80 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {circle.title}
                        </h4>
                        <Shield className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{circle.description}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs px-3 py-1 rounded-full font-medium">
                      {circle.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{circle.members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{circle.activeNow} active</span>
                      </div>
                    </div>
                    <div className="text-blue-600 text-sm font-medium cursor-pointer hover:underline flex items-center">
                      Join Circle <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety and Anonymity Notice */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/70 rounded-lg p-3 border border-gray-200 backdrop-blur-sm">
              <Lock className="w-4 h-4 text-blue-500" />
              <span>All conversations are anonymous and AI-moderated for safety</span>
            </div>
          </div>

          {/* Column for Local Meetup Connections */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Local Meetup Connections</h3>
                <p className="text-sm text-gray-500">Consensual offline peer support</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Mapping through meetupInterests data to display local groups. */}
              {meetupInterests.map((location, index) => (
                <div
                  key={index}
                  className="group bg-white/80 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-gray-900">{location.city}</h4>
                    </div>
                    <span className="text-sm text-gray-500">{location.members} members</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {/* Displaying interests for each location. */}
                    {location.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="text-blue-600 border border-blue-200 bg-blue-50/40 px-3 py-1 text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="text-center text-blue-600 border border-blue-200 rounded-full py-2 text-sm font-medium hover:bg-blue-50/60 cursor-pointer">
                    Express Interest
                  </div>
                </div>
              ))}
            </div>

            {/* Consent and Safety Notice */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/70 rounded-lg p-3 border border-gray-200 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Double opt-in system ensures mutual consent before connections</span>
            </div>
            
            {/* Decorative Image */}
            <div className="w-full h-48 rounded-3xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1613618958001-ee9ad8f01f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Mental health community support"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* Community Statistics Bar */}
        <div className="grid sm:grid-cols-4 gap-8 p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-md">
          {[
            { value: "150+", label: "Active Circles" },
            { value: "25K+", label: "Community Members" },
            { value: "50+", label: "Cities Covered" },
            { value: "99.2%", label: "Safety Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default CommunitySection;
