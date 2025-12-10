// src/components/TherapistSection.jsx
// This component renders the "Therapists" section of the landing page.
// It showcases a selection of verified therapists, displaying their key information
// in a card-based layout. It uses mock data to populate the therapist profiles,
// making it easy to replace with real data from an API. The section also highlights
// key benefits of the service, such as affordability and professional verification.

import {
  Star,
  Clock,
  MapPin,
  Video,
  MessageSquare,
  Award,
  Calendar,
  IndianRupee,
} from "lucide-react";

// Mock data array for therapist profiles. In a real application, this would be fetched from an API.
const therapists = [
  {
    name: "Dr. Priya Sharma",
    specialization: "Anxiety & Depression",
    experience: "8 years",
    rating: 4.9,
    reviews: 127,
    price: 350,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    nextAvailable: "Today 3:00 PM",
    image: "PS", // Placeholder for image/initials
  },
  {
    name: "Dr. Rajesh Kumar",
    specialization: "Relationship Counseling",
    experience: "12 years",
    rating: 4.8,
    reviews: 203,
    price: 400,
    location: "Delhi, NCR",
    languages: ["Hindi", "English", "Punjabi"],
    nextAvailable: "Tomorrow 10:00 AM",
    image: "RK",
  },
  {
    name: "Dr. Ananya Nair",
    specialization: "Trauma & PTSD",
    experience: "6 years",
    rating: 4.9,
    reviews: 89,
    price: 500,
    location: "Bangalore, Karnataka",
    languages: ["English", "Malayalam", "Kannada"],
    nextAvailable: "Today 7:00 PM",
    image: "AN",
  },
];

// TherapistSection component: Displays a list of featured therapists.
export function TherapistSection() {
  return (
    <section
      id="therapists"
      className="py-20 bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center bg-gradient-to-r from-gray-200 to-blue-100 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              Verified Professionals
            </div>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-poppins font-bold">
              Connect with{" "}
              <span className="bg-gradient-to-r from-blue-300 to-gray-300 bg-clip-text text-transparent">
                Qualified Therapists
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl font-inter">
              Our network of licensed mental health professionals offers
              affordable, high-quality care with flexible scheduling to fit your
              needs.
            </p>
          </div>

          {/* Decorative Image */}
          <div className="lg:w-80">
            <div className="w-full h-48 bg-gray-200 rounded-4xl shadow-lg overflow-hidden border border-gray-300">
              <img
                src="https://images.unsplash.com/photo-1620148222862-b95cf7405a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwdGhlcmFweSUyMHN1cHBvcnR8ZW58MXx8fHwxNzU5MTU1MTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Therapy Support"
                className="w-full h-full object-cover rounded-4xl"
              />
            </div>
          </div>
        </div>

        {/* Grid of Therapist Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Mapping over the therapists data to render each card. */}
          {therapists.map((therapist, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-6 space-y-4">
                {/* Card Header with Name, Specialization, and Availability */}
                <div className="flex items-start justify-between">
                  {/* ... */}
                </div>

                {/* Therapist Statistics (Rating, Experience) */}
                <div className="flex items-center space-x-4 text-sm">
                  {/* ... */}
                </div>

                {/* Therapist Details (Location, Languages, Availability) */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {/* ... */}
                </div>

                {/* Pricing and Call-to-Action Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    {/* Price per session */}
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg font-medium text-foreground">
                        {therapist.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / session
                      </span>
                    </div>
                    {/* Action buttons (e.g., video, chat) */}
                    <div className="flex space-x-2">
                      {/* ... */}
                    </div>
                  </div>
                  {/* Main "Book Session" button */}
                  <button className="w-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-gray-200 hover:opacity-90 text-white px-4 py-2 rounded-md font-medium transition">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section Highlighting Key Benefits */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium">Verified Professionals</h4>
            <p className="text-sm text-muted-foreground">
              All therapists are licensed and background-checked
            </p>
          </div>
          {/* ... other benefit highlights */}
        </div>
      </div>
    </section>
  );
}
export default TherapistSection;