import { Plane, TrafficCone, MapPin, Briefcase, Check } from "lucide-react";

export default function Services() {
  const openServiceModal = (service: string) => {
    alert(`Service inquiry for: ${service}. Please call +91-9876543210 or use the contact form for detailed booking.`);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Travel Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From quick airport runs to comprehensive Pune city tours, we provide reliable transportation 
            solutions tailored to your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Airport Transfers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Punctual pickup and drop services to/from Pune Airport. Track your flight, 
                meet & greet available.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Flight tracking</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Meet & greet service</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Fixed rates</span>
                </div>
              </div>
              <button 
                onClick={() => openServiceModal('airport')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Book Airport Transfer
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
            <div className="text-center">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrafficCone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intercity Travel</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comfortable outstation trips to Mumbai, Nashik, Aurangabad, Lonavala, 
                and other destinations.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>AC vehicles</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Experienced drivers</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Flexible itinerary</span>
                </div>
              </div>
              <button 
                onClick={() => openServiceModal('intercity')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Plan Your Trip
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
            <div className="text-center">
              <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local City Tours</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explore Pune's heritage sites, IT parks, shopping areas with our 
                knowledgeable local guides.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Local expertise</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Custom itineraries</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Historical insights</span>
                </div>
              </div>
              <button 
                onClick={() => openServiceModal('tours')}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Explore Pune
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
            <div className="text-center">
              <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Travel</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professional transportation for business meetings, events, 
                and employee commute services.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Corporate billing</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Regular bookings</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Professional drivers</span>
                </div>
              </div>
              <button 
                onClick={() => openServiceModal('corporate')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Corporate Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
