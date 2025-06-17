import { MapPin, Shield, Clock, DollarSign, Headphones, Car } from "lucide-react";

export default function USPs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Indicab Travels?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand Pune's roads, traffic patterns, and what matters most to our local customers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Pune Expertise</h3>
            <p className="text-gray-600 leading-relaxed">
              Our drivers know every shortcut, traffic pattern, and the best routes to get you there 
              on time, whether it's Baner, Kothrud, or Hadapsar.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety First</h3>
            <p className="text-gray-600 leading-relaxed">
              All our vehicles undergo regular maintenance checks, and our drivers are 
              background verified with clean driving records.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Always On Time</h3>
            <p className="text-gray-600 leading-relaxed">
              We factor in Pune's traffic conditions and arrive 10 minutes early for airport 
              pickups and important business meetings.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent Pricing</h3>
            <p className="text-gray-600 leading-relaxed">
              No surge pricing, no hidden charges. What we quote is what you pay, 
              with upfront pricing for all destinations.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Round-the-clock customer support in Marathi, Hindi, and English. 
              We're here whenever you need us.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Well-Maintained Fleet</h3>
            <p className="text-gray-600 leading-relaxed">
              Clean, comfortable vehicles with AC, GPS tracking, and emergency equipment. 
              Sedans to SUVs for all group sizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
