import { Calculator, Route, Shield, Clock, Star, Plane, MapPin, TrafficCone, Briefcase } from "lucide-react";

export default function Hero() {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden">
      {/* Modern geometric background with travel-related visual elements */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0">
        {/* Stylized travel/transportation pattern */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white opacity-10 transform rotate-45"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Pune's Most <span className="text-yellow-400">Trusted</span> Travel Partner
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Reliable airport transfers, comfortable intercity journeys, and guided local tours. 
              Experience Pune and beyond with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={scrollToBooking}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Calculator className="w-4 h-4 mr-2 inline" />
                Book Your Ride
              </button>
              <button 
                onClick={scrollToServices}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
              >
                <Route className="w-4 h-4 mr-2 inline" />
                Explore Services
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Fully Licensed</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span>500+ Happy Customers</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Professional car/taxi illustration placeholder */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <Plane className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                  <h3 className="font-semibold">Airport Transfers</h3>
                  <p className="text-sm text-blue-100">Punctual & Reliable</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <MapPin className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                  <h3 className="font-semibold">Local Tours</h3>
                  <p className="text-sm text-blue-100">Expert Guidance</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <TrafficCone className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                  <h3 className="font-semibold">Intercity Travel</h3>
                  <p className="text-sm text-blue-100">Comfortable Journeys</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <Briefcase className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                  <h3 className="font-semibold">Corporate Travel</h3>
                  <p className="text-sm text-blue-100">Professional Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
