import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Perfect airport pickup service! The driver arrived early, helped with luggage, and knew exactly which route to take despite Pune's traffic. Highly recommended!",
      name: "Priya Joshi",
      location: "Software Engineer, Kothrud"
    },
    {
      id: 2,
      rating: 5,
      text: "Excellent service for our Mumbai trip. Clean car, courteous driver, and very reasonable rates. The driver waited for us during our shopping in Mumbai too!",
      name: "Amit & Sunita Patil",
      location: "Regular Customers, Baner"
    },
    {
      id: 3,
      rating: 5,
      text: "As a visiting consultant, I needed reliable transport for client meetings. Indicab was punctual every single time and their drivers are very professional.",
      name: "Rakesh Kumar",
      location: "Business Consultant, Delhi"
    },
    {
      id: 4,
      rating: 5,
      text: "Great Pune city tour! The driver showed us places we never knew existed. Very knowledgeable about Pune's history and current developments.",
      name: "Dr. Sarah Johnson",
      location: "Tourist from UK"
    },
    {
      id: 5,
      rating: 5,
      text: "Corporate travel made easy! They handle all our employee transportation needs efficiently. Billing is transparent and service is consistent.",
      name: "Meera Desai",
      location: "HR Manager, IT Company"
    },
    {
      id: 6,
      rating: 5,
      text: "Reliable service for family functions. They accommodated our large group and even helped coordinate with the venue. True professionals!",
      name: "Ganesh Kulkarni Family",
      location: "Hadapsar Residents"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Pune Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real people who trust us with their travel needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </blockquote>
              <cite className="text-gray-900 font-semibold">{testimonial.name}</cite>
              <div className="text-sm text-gray-500">{testimonial.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
