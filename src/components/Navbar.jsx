import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">

          {/* Left: Logo */}
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-50 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-medium text-gray-900">GenMillenauts</span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#therapists" className="text-gray-500 hover:text-gray-900 transition-colors">
              Find Therapists
            </a>
            <a href="#community" className="text-gray-500 hover:text-gray-900 transition-colors">
              Community
            </a>
            <a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4 flex-1">
            <button className="hidden sm:inline-flex px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition">
              Sign In
            </button>
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:opacity-90 transition">
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white/90 backdrop-blur-md rounded-md p-4 shadow-lg">
            <a href="#features" className="block text-gray-700 hover:text-gray-900">
              Features
            </a>
            <a href="#therapists" className="block text-gray-700 hover:text-gray-900">
              Find Therapists
            </a>
            <a href="#community" className="block text-gray-700 hover:text-gray-900">
              Community
            </a>
            <a href="#about" className="block text-gray-700 hover:text-gray-900">
              About
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
