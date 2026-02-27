import { Plane, Camera, Heart, Award } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { Timeline } from "./Timeline";

interface AboutPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 animate-pulse">
            <Camera className="h-20 w-20" />
          </div>
          <div className="absolute bottom-10 left-10 animate-bounce">
            <Plane className="h-16 w-16 rotate-45" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-center text-5xl mb-4">About Me</h1>
          <p className="text-center text-xl text-white/90 max-w-2xl mx-auto">
            Passionate traveler • Photographer • Storyteller
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main About Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-t-4 border-blue-500">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <h2 className="text-blue-900">
                    My Story
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Hello! I'm a passionate traveler, photographer, and storyteller. What started as 
                  a simple backpacking trip through Europe has evolved into a lifelong journey of 
                  exploration and discovery.
                </p>
                <p className="text-gray-600 mb-4">
                  Through this blog, I share my experiences, tips, and the lessons I've learned 
                  along the way. From navigating bustling city streets to finding hidden gems off 
                  the beaten path, every journey teaches me something new about the world and myself.
                </p>
                <p className="text-gray-600">
                  When I'm not traveling, you can find me planning my next adventure, editing photos, 
                  or dreaming about all the places I've yet to visit. Join me as I continue to explore 
                  this beautiful planet we call home.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1589395937920-07cce323acba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB3b3JsZCUyMG1hcHxlbnwxfHx8fDE3NjE5OTAzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="World map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 shadow-xl">
                  <div className="text-2xl">🌍</div>
                  <div className="text-sm mt-1">Exploring the world</div>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-8">
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-blue-500" />
                <h2 className="text-blue-900">
                  My Travel Philosophy
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="text-3xl mb-3">🎭</div>
                  <h3 className="mb-2">Authentic Experiences</h3>
                  <p className="text-gray-600">
                    I believe in immersing myself in local culture, trying regional cuisine, 
                    and connecting with people from different backgrounds.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="mb-2">Sustainable Travel</h3>
                  <p className="text-gray-600">
                    Being mindful of my environmental impact and supporting local communities 
                    wherever I go is essential to responsible travel.
                  </p>
                </div>
                <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="mb-2">Continuous Learning</h3>
                  <p className="text-gray-600">
                    Every destination offers new perspectives and lessons. I'm always eager to 
                    learn from the places I visit and the people I meet.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-8 mt-8">
              <h2 className="mb-6 text-center text-blue-900">
                Travel Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-blue-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                  <div className="text-4xl mb-2">25+</div>
                  <div className="text-sm">Countries</div>
                </div>
                <div className="text-center p-6 bg-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                  <div className="text-4xl mb-2">50+</div>
                  <div className="text-sm">Cities</div>
                </div>
                <div className="text-center p-6 bg-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                  <div className="text-4xl mb-2">4</div>
                  <div className="text-sm">Continents</div>
                </div>
                <div className="text-center p-6 bg-orange-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                  <div className="text-4xl mb-2">100+</div>
                  <div className="text-sm">Adventures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Timeline Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-blue-500">
            <div className="flex items-center gap-2 mb-8">
              <Plane className="h-6 w-6 text-blue-500" />
              <h2 className="text-blue-900">
                My Travel Timeline
              </h2>
            </div>
            <Timeline onPostClick={(postId) => onNavigate?.("post", { postId })} />
          </div>
        </div>
      </div>
    </div>
  );
}
