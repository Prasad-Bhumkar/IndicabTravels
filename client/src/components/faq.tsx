import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqData = [
    {
      category: "Booking & Reservations",
      questions: [
        {
          id: "booking-1",
          question: "How far in advance should I book my ride?",
          answer: "For airport transfers and intercity trips, we recommend booking at least 2-4 hours in advance. For same-day bookings, call us directly at +91-9876543210. Corporate and event bookings should be made 24-48 hours ahead."
        },
        {
          id: "booking-2",
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking up to 2 hours before the scheduled pickup time without any charges. For cancellations within 2 hours, a nominal fee may apply. Contact us immediately if you need to make changes."
        },
        {
          id: "booking-3",
          question: "Do you provide 24/7 booking services?",
          answer: "Yes, we accept bookings 24/7. Our phone lines are always open for urgent bookings. Online bookings through our website are processed immediately, and we'll confirm within 30 minutes."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          id: "pricing-1",
          question: "How is the fare calculated?",
          answer: "Our fares are based on distance, vehicle type, and time of travel. Airport transfers have fixed rates regardless of traffic. Intercity trips are charged per kilometer. Hourly rentals have fixed rates for 4, 8, 12, or 24-hour packages."
        },
        {
          id: "pricing-2",
          question: "Are there any hidden charges?",
          answer: "No, we believe in transparent pricing. The quoted fare includes driver allowance, fuel, and tolls for most routes. Additional charges may apply for waiting time beyond 15 minutes, parking fees at specific venues, and premium vehicle upgrades."
        },
        {
          id: "pricing-3",
          question: "What payment methods do you accept?",
          answer: "We accept cash, UPI payments, credit/debit cards, and online bank transfers. For corporate clients, we offer monthly billing with GST invoices. Payment can be made before, during, or after the trip based on your preference."
        }
      ]
    },
    {
      category: "Vehicle & Safety",
      questions: [
        {
          id: "vehicle-1",
          question: "What types of vehicles do you have?",
          answer: "Our fleet includes AC sedans (Dzire, Etios), SUVs (Innova, Ertiga), luxury sedans (Camry, Accord), premium SUVs (Fortuner, Endeavour), and tempo travellers (12-15 seater) for group travel."
        },
        {
          id: "vehicle-2",
          question: "Are your vehicles and drivers verified?",
          answer: "Yes, all our vehicles undergo regular maintenance and safety checks. Our drivers are licensed, background-verified, and trained in customer service. Every vehicle has GPS tracking, first aid kit, and emergency contact numbers."
        },
        {
          id: "vehicle-3",
          question: "Do you provide child seats or wheelchair accessible vehicles?",
          answer: "Yes, we provide child seats upon request at no extra charge. We also have wheelchair accessible vehicles available. Please mention these requirements while booking so we can arrange the appropriate vehicle."
        }
      ]
    },
    {
      category: "Routes & Destinations",
      questions: [
        {
          id: "routes-1",
          question: "Which areas in Pune do you cover?",
          answer: "We cover all areas within Pune and PCMC including Kothrud, Baner, Hinjewadi, Hadapsar, Kharadi, Wakad, Aundh, Viman Nagar, and surrounding areas. We also service Pune Airport and railway stations."
        },
        {
          id: "routes-2",
          question: "Do you provide outstation trips?",
          answer: "Yes, we offer comfortable outstation trips to Mumbai, Nashik, Aurangabad, Lonavala, Mahabaleshwar, and other destinations across Maharashtra. Multi-day trips can be arranged with driver accommodation."
        },
        {
          id: "routes-3",
          question: "What about airport pickup tracking?",
          answer: "We track your flight status and adjust pickup time automatically for delays. Our drivers will be at the arrival gate with your name board. We provide 60 minutes of free waiting time for international flights and 30 minutes for domestic flights."
        }
      ]
    },
    {
      category: "Special Services",
      questions: [
        {
          id: "special-1",
          question: "Do you offer corporate travel solutions?",
          answer: "Yes, we provide dedicated corporate travel services including employee transportation, client pickup/drops, airport transfers for business travelers, and event transportation. We offer monthly billing, priority booking, and account management."
        },
        {
          id: "special-2",
          question: "Can you arrange city tours and sightseeing?",
          answer: "Absolutely! We offer customized Pune city tours covering historical sites, IT parks, shopping areas, and local attractions. Our drivers are knowledgeable about Pune's history and can provide insights during the tour."
        },
        {
          id: "special-3",
          question: "Do you provide wedding and event transportation?",
          answer: "Yes, we specialize in wedding and event transportation. We can arrange decorated vehicles for special occasions, group transportation for guests, and coordinate multiple vehicle requirements for large events."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about our travel services.
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category) => (
            <Card key={category.category} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact section for more questions */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly customer support team is here to help you 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm mb-3">Available 24/7 for urgent queries</p>
              <a href="tel:+91-9876543210" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                +91-9876543210
              </a>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
              <p className="text-gray-600 text-sm mb-3">Quick support and booking updates</p>
              <a href="https://wa.me/919876543210" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Message us
              </a>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-3">Detailed queries and feedback</p>
              <a href="mailto:info@indicabtravels.com" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                info@indicabtravels.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}