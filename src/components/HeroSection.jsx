import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,152,219,0.1),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-gradient-to-r from-gray-100 to-blue-100 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Mental Wellness
              </div>

              

              <h1 className="text-2xl sm:text-5xl lg:text-6xl tracking-tight">
                Your Journey to  {""}
                <span className="bg-gradient-to-b from-blue-500 to-blue-200 bg-clip-text text-transparent tracking-tight font-poppins ">
                  Mental Wellness
                </span>{" "}
                Starts Here
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl  font-inter text-gray-500">
                Connect with affordable therapists, join supportive peer
                circles, and get personalized AI guidance. Build a caring
                community around your mental health journey.
              </p>
            </div>

            {/* Features Pills */}
            <div className="inline-flex bg-gradient-to-r from-gray-100 to-blue-100 rounded-full overflow-hidden text-sm shadow-sm">
              <div className="flex items-center px-4 py-2 border-r border-gray-200">
                <Shield className="w-4 h-4 text-primary mr-2" />
                <span>Anonymous & Safe</span>
              </div>
              <div className="flex items-center px-4 py-2 border-r border-gray-200">
                <Heart className="w-4 h-4 text-info mr-2" />
                <span>Family Alerts</span>
              </div>
              <div className="flex items-center px-4 py-2">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span>AI Check-ins</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-100 text-white hover:opacity-90 transition flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-6 py-3 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/20">
              <div>
                <div className="text-2xl font-medium text-foreground">
                  1,200+
                </div>
                <div className="text-sm text-muted-foreground text-gray-400">
                  Verified Therapists
                </div>
              </div>
              <div>
                <div className="text-2xl font-medium text-foreground">
                  25,000+
                </div>
                <div className="text-sm text-muted-foreground text-gray-400">
                  Community Members
                </div>
              </div>
              <div>
                <div className="text-2xl font-medium text-foreground">98%</div>
                <div className="text-sm text-muted-foreground text-gray-400">
                  User Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1701416050613-380867e4be26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsJTIwbmF0dXJlfGVufDF8fHx8MTc1OTE1NTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Peaceful meditation scene representing mental wellness"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-info rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    AI Check-in Active
                  </span>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-sm font-medium text-foreground">
                  Today's Mood
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-6 rounded-full ${
                          i <= 4 ? "bg-info" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Good</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-info/20 rounded-3xl -z-10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
