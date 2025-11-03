import { 
  Stethoscope, 
  Users, 
  MapPin, 
  Sparkles, 
  Shield, 
  ArrowRight,
  Brain,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Affordable Therapist Connect",
    description: "Connect with verified mental health professionals offering low-cost sessions. Quality care shouldn't break the bank.",
    benefits: ["Verified professionals", "Affordable pricing", "Easy scheduling"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Anonymous Peer Circles",
    description: "Join safe, moderated discussion groups where you can share experiences and support others while maintaining complete anonymity.",
    benefits: ["Complete anonymity", "AI-moderated safety", "24/7 availability"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Local Meetup Connections",
    description: "Opt-in to connect with peers in your area for offline support. Double consent ensures your privacy and comfort.",
    benefits: ["Location-based matching", "Double opt-in privacy", "Secure chat bridge"],
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Smart Check-ins",
    description: "Engage in empathetic conversations with our AI that generates personalized wellness content and guidance based on your emotional state.",
    benefits: ["Personalized content", "Emotional insights", "24/7 support"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Shield,
    title: "Family & Friends Alerts",
    description: "Consent-based system that gently notifies your chosen contacts when you need extra support during difficult times.",
    benefits: ["Consent-based alerts", "Gentle notifications", "Emergency support"],
    gradient: "from-rose-500 to-pink-500",
  }
];

export function FeaturesSection() {
  return (
    <section 
      id="features" 
      className="py-20 bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-200 to-blue-100 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
            <Brain className="w-4 h-4 mr-2" />
            Complete Wellness Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-poppins font-bold">
            Five Pillars of{" "}
            <span className="bg-gradient-to-r from-blue-500 to-grey-600  bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter">
            Our integrated approach combines professional care, peer support, AI guidance, and family connections 
            to create a comprehensive mental wellness ecosystem tailored for India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative p-6 space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors font-poppins">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-inter">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-sm text-muted-foreground font-inter">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <button className="w-full flex justify-between items-center text-primary hover:bg-primary/5 rounded-md px-4 py-2 mt-6 font-medium transition">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-blue-100 rounded-full px-6 py-3 border border-gray-200 shadow-md">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium font-inter">Trusted by thousands across India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;