// src/components/Footer.jsx
// This component renders the main footer for the website. It is structured into multiple sections:
// 1. Main Footer: Contains branding, social media links, navigation links for the platform and resources, and contact information.
// 2. Emergency Banner: A prominent banner with a crisis support hotline and a link to emergency resources.
// 3. Bottom Bar: Includes the copyright notice and a "Made with love" message.
// The component is designed to be informative, user-friendly, and visually consistent with the site's theme.

import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

// Footer component: A comprehensive footer with contact details, links, and emergency information.
export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-blue-50 border-t border-blue-100 font-[Poppins]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Information and Social Links */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-800">GenMillenauts</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Building a compassionate mental wellness ecosystem that connects people to care, 
              community, and hope across India.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button 
                  key={i}
                  className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center bg-white hover:bg-blue-50 transition"
                >
                  <Icon className="w-4 h-4 text-blue-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links for Platform Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Platform</h4>
            <div className="space-y-3 text-sm">
              {["Find Therapists", "Join Peer Circles", "AI Check-ins", "Local Meetups", "Family Alerts"].map((item, i) => (
                <a key={i} href="#" className="block text-gray-600 hover:text-blue-600 transition">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Links to Resources and Legal Documents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Resources</h4>
            <div className="space-y-3 text-sm">
              {["Crisis Helplines", "Mental Health Guide", "Safety Guidelines", "Privacy Policy", "Terms of Service"].map((item, i) => (
                <a key={i} href="#" className="block text-gray-600 hover:text-blue-600 transition">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information and Trust Badges */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>support@genmillenauts.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+91-800-WELLNESS</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Trust and Compliance Badges */}
            <div className="space-y-2 pt-3">
              <div className="inline-flex items-center text-green-700 bg-green-50 border border-green-200 text-xs px-2 py-1 rounded-md">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </div>
              <div className="inline-flex items-center text-blue-700 bg-blue-50 border border-blue-200 text-xs px-2 py-1 rounded-md">
                <Award className="w-3 h-3 mr-1" />
                ISO 27001 Certified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Support Banner */}
      <div className="border-t border-blue-100 bg-gradient-to-r from-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-rose-600" />
              <span>
                <strong className="text-rose-600">Crisis Support:</strong> Call 91529-87821 (24/7)
              </span>
            </div>
            <button className="px-4 py-1.5 text-sm border border-rose-300 rounded-md text-rose-600 bg-white hover:bg-rose-50 transition">
              Emergency Resources
            </button>
          </div>
        </div>
      </div>

      {/* Copyright and Attribution Bar */}
      <div className="border-t border-blue-100 bg-blue-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm text-gray-600">
            <div>© 2024 GenMillenauts Mental Wellness Platform. All rights reserved.</div>
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>for mental wellness in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;