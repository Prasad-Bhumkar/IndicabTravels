import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Users, 
  Fuel, 
  Shield, 
  Snowflake,
  Wifi,
  Music,
  Star,
  CheckCircle
} from "lucide-react";

export default function VehicleGallery() {
  const vehicleCategories = [
    {
      id: "sedan",
      name: "Sedans",
      description: "Comfortable and economical for city rides",
      vehicles: [
        {
          name: "Maruti Dzire",
          category: "Economy Sedan",
          capacity: 4,
          features: ["AC", "Power Steering", "Music System", "GPS"],
          pricing: "₹12-15/km",
          image: "/api/placeholder/400/250",
          description: "Perfect for airport transfers and city rides. Fuel-efficient and reliable.",
          specs: {
            fuelType: "Petrol/CNG",
            transmission: "Manual/Auto",
            luggage: "2 Large Bags"
          }
        },
        {
          name: "Toyota Etios",
          category: "Premium Sedan",
          capacity: 4,
          features: ["AC", "Power Windows", "Central Lock", "ABS"],
          pricing: "₹14-17/km",
          image: "/api/placeholder/400/250",
          description: "Spacious sedan with enhanced comfort and safety features.",
          specs: {
            fuelType: "Petrol",
            transmission: "Manual",
            luggage: "3 Large Bags"
          }
        }
      ]
    },
    {
      id: "suv",
      name: "SUVs",
      description: "Spacious vehicles for families and groups",
      vehicles: [
        {
          name: "Toyota Innova",
          category: "Premium SUV",
          capacity: 7,
          features: ["AC", "Captain Seats", "Entertainment System", "GPS"],
          pricing: "₹18-22/km",
          image: "/api/placeholder/400/250",
          description: "Most popular choice for family trips and group travel.",
          specs: {
            fuelType: "Diesel",
            transmission: "Manual",
            luggage: "4 Large Bags"
          }
        },
        {
          name: "Maruti Ertiga",
          category: "Compact SUV",
          capacity: 6,
          features: ["AC", "Music System", "Power Steering", "Central Lock"],
          pricing: "₹16-19/km",
          image: "/api/placeholder/400/250",
          description: "Compact yet spacious, ideal for small group outings.",
          specs: {
            fuelType: "Petrol/CNG",
            transmission: "Manual",
            luggage: "3 Large Bags"
          }
        }
      ]
    },
    {
      id: "luxury",
      name: "Luxury",
      description: "Premium vehicles for special occasions",
      vehicles: [
        {
          name: "Toyota Camry",
          category: "Luxury Sedan",
          capacity: 4,
          features: ["Leather Seats", "Climate Control", "Premium Audio", "Sunroof"],
          pricing: "₹28-35/km",
          image: "/api/placeholder/400/250",
          description: "Executive class sedan for business travel and special events.",
          specs: {
            fuelType: "Petrol",
            transmission: "Automatic",
            luggage: "3 Large Bags"
          }
        },
        {
          name: "Toyota Fortuner",
          category: "Premium SUV",
          capacity: 7,
          features: ["4WD", "Leather Interior", "Premium Sound", "Climate Control"],
          pricing: "₹35-42/km",
          image: "/api/placeholder/400/250",
          description: "Ultimate luxury SUV for premium travel experience.",
          specs: {
            fuelType: "Diesel",
            transmission: "Automatic",
            luggage: "5 Large Bags"
          }
        }
      ]
    },
    {
      id: "group",
      name: "Group Travel",
      description: "Large capacity vehicles for events and tours",
      vehicles: [
        {
          name: "Tempo Traveller",
          category: "Mini Bus",
          capacity: 12,
          features: ["AC", "Reclining Seats", "Music System", "First Aid"],
          pricing: "₹25-30/km",
          image: "/api/placeholder/400/250",
          description: "Perfect for group tours, corporate events, and family functions.",
          specs: {
            fuelType: "Diesel",
            transmission: "Manual",
            luggage: "8-10 Bags"
          }
        },
        {
          name: "15-Seater Tempo",
          category: "Large Group",
          capacity: 15,
          features: ["AC", "Entertainment System", "Comfortable Seating", "GPS"],
          pricing: "₹28-33/km",
          image: "/api/placeholder/400/250",
          description: "Ideal for large group travel and extended tours.",
          specs: {
            fuelType: "Diesel",
            transmission: "Manual",
            luggage: "12-15 Bags"
          }
        }
      ]
    }
  ];

  const safetyFeatures = [
    { icon: Shield, name: "Safety First", description: "Regular maintenance and safety checks" },
    { icon: CheckCircle, name: "Licensed Drivers", description: "Background verified and trained drivers" },
    { icon: Fuel, name: "Fuel Efficient", description: "Well-maintained engines for optimal performance" },
    { icon: Snowflake, name: "AC Comfort", description: "All vehicles equipped with working AC" }
  ];

  return (
    <section id="vehicles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Vehicle Fleet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse range of well-maintained vehicles, each designed to provide 
            comfort, safety, and reliability for your journey.
          </p>
        </div>

        {/* Safety Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="sedan" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            {vehicleCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-center">
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-gray-500 hidden sm:block">{category.description}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {vehicleCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 gap-8">
                {category.vehicles.map((vehicle, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-400" />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">{vehicle.name}</span>
                        </div>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                        {vehicle.category}
                      </Badge>
                      <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                        {vehicle.pricing}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {vehicle.name}
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Up to {vehicle.capacity} passengers
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 mb-4">{vehicle.description}</p>
                      
                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <Fuel className="w-3 h-3 mr-2 text-green-600" />
                            <span className="text-gray-600">{vehicle.specs.fuelType}</span>
                          </div>
                          <div className="flex items-center">
                            <Car className="w-3 h-3 mr-2 text-blue-600" />
                            <span className="text-gray-600">{vehicle.specs.transmission}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <span className="text-gray-600">Luggage: {vehicle.specs.luggage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Book Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Get Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Fleet?</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every vehicle in our fleet is carefully selected and maintained to ensure your safety, 
              comfort, and satisfaction throughout your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Regular Maintenance</h4>
              <p className="text-sm text-gray-600">
                All vehicles undergo weekly maintenance checks and safety inspections
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Insurance Coverage</h4>
              <p className="text-sm text-gray-600">
                Comprehensive insurance coverage for passenger safety and peace of mind
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-sm text-gray-600">
                Only vehicles meeting our strict quality standards are added to our fleet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}