import { Heart, Users, Leaf, Quote } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Born in Pune, <span className="text-blue-600">Built for Pune</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded by longtime Pune residents who understand the unique transportation needs 
              of our growing city. From the bustling streets of FC Road to the tech corridors 
              of Hinjewadi, we've been connecting people to their destinations with reliability and care.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              What started as a small family business has grown into Pune's trusted travel partner, 
              serving everyone from daily commuters to international visitors exploring our beautiful city.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">8+</div>
                <div className="text-sm text-gray-600">Years in Pune</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">2000+</div>
                <div className="text-sm text-gray-600">Trips Completed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">Vehicles</div>
              </div>
            </div>
            
            {/* Core values */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values</h3>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Reliability</h4>
                  <p className="text-gray-600 text-sm">Every booking is a promise we keep</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Community</h4>
                  <p className="text-gray-600 text-sm">Supporting local Pune families and businesses</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sustainability</h4>
                  <p className="text-gray-600 text-sm">Eco-friendly practices for a better Pune</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Professional team photo or Pune landmarks collage */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <Quote className="w-12 h-12 text-blue-300 mb-6 mx-auto" />
                <blockquote className="text-lg italic mb-6">
                  "Our mission is simple: to make every journey in and around Pune 
                  comfortable, safe, and memorable. Whether you're rushing to catch a 
                  flight or exploring our city's rich heritage, we're honored to be 
                  part of your story."
                </blockquote>
                <cite className="text-blue-200">
                  - Rajesh Sharma, Founder <br />
                  <span className="text-sm">Pune Local since 1995</span>
                </cite>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
