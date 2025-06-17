import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  MapPin, 
  Clock, 
  Car, 
  Users, 
  Route,
  Plane,
  ArrowRight,
  Timer
} from "lucide-react";

interface PricingResult {
  basePrice: number;
  distance: number;
  duration: string;
  vehicleType: string;
  additionalCharges: number;
  totalPrice: number;
  breakdown: string[];
}

export default function PricingCalculator() {
  const [bookingType, setBookingType] = useState<"one-way" | "return" | "rental">("one-way");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [pricing, setPricing] = useState<PricingResult | null>(null);

  const puneLocations = [
    { value: "pune-airport", label: "Pune Airport (PNQ)", zone: "airport" },
    { value: "pune-station", label: "Pune Railway Station", zone: "central" },
    { value: "shivajinagar", label: "Shivajinagar", zone: "central" },
    { value: "koregaon-park", label: "Koregaon Park", zone: "central" },
    { value: "baner", label: "Baner", zone: "west" },
    { value: "kothrud", label: "Kothrud", zone: "west" },
    { value: "hadapsar", label: "Hadapsar", zone: "east" },
    { value: "hinjewadi", label: "Hinjewadi IT Park", zone: "west" },
    { value: "magarpatta", label: "Magarpatta City", zone: "east" },
    { value: "wakad", label: "Wakad", zone: "west" },
    { value: "aundh", label: "Aundh", zone: "north" },
    { value: "viman-nagar", label: "Viman Nagar", zone: "east" },
    { value: "kharadi", label: "Kharadi", zone: "east" },
    { value: "pimpri", label: "Pimpri Chinchwad", zone: "north" }
  ];

  const intercityDestinations = [
    { value: "mumbai", label: "Mumbai", distance: 150, basePrice: 3500 },
    { value: "nashik", label: "Nashik", distance: 210, basePrice: 4500 },
    { value: "aurangabad", label: "Aurangabad", distance: 240, basePrice: 5000 },
    { value: "lonavala", label: "Lonavala", distance: 65, basePrice: 2000 },
    { value: "mahabaleshwar", label: "Mahabaleshwar", distance: 120, basePrice: 3000 },
    { value: "shirdi", label: "Shirdi", distance: 185, basePrice: 4000 }
  ];

  const vehicles = [
    { value: "sedan", label: "Sedan (AC)", capacity: 4, priceMultiplier: 1.0, description: "Dzire, Etios" },
    { value: "suv", label: "SUV (AC)", capacity: 6, priceMultiplier: 1.4, description: "Innova, Ertiga" },
    { value: "luxury-sedan", label: "Luxury Sedan", capacity: 4, priceMultiplier: 1.8, description: "Camry, Accord" },
    { value: "luxury-suv", label: "Premium SUV", capacity: 6, priceMultiplier: 2.2, description: "Fortuner, Endeavour" },
    { value: "tempo", label: "Tempo Traveller", capacity: 12, priceMultiplier: 2.0, description: "12-15 seater" }
  ];

  const rentalPackages = [
    { value: "4-hours", label: "4 Hours (Half Day)", basePrice: 1200 },
    { value: "8-hours", label: "8 Hours (Full Day)", basePrice: 2000 },
    { value: "12-hours", label: "12 Hours", basePrice: 2800 },
    { value: "24-hours", label: "24 Hours", basePrice: 4500 }
  ];

  const calculateLocalPrice = (fromZone: string, toZone: string, vehicle: string): PricingResult => {
    const distances: { [key: string]: { [key: string]: number } } = {
      "central": { "central": 8, "west": 15, "east": 12, "north": 18, "airport": 10 },
      "west": { "central": 15, "west": 10, "east": 25, "north": 20, "airport": 25 },
      "east": { "central": 12, "west": 25, "east": 8, "north": 22, "airport": 8 },
      "north": { "central": 18, "west": 20, "east": 22, "north": 10, "airport": 15 },
      "airport": { "central": 10, "west": 25, "east": 8, "north": 15, "airport": 5 }
    };

    const basePrice = fromZone === "airport" || toZone === "airport" ? 350 : 250;
    const distance = distances[fromZone]?.[toZone] || 15;
    const vehicleData = vehicles.find(v => v.value === vehicle);
    const multiplier = vehicleData?.priceMultiplier || 1.0;
    
    const calculatedPrice = Math.round(basePrice * multiplier + (distance * 12 * multiplier));
    
    return {
      basePrice: Math.round(basePrice * multiplier),
      distance,
      duration: `${Math.round(distance / 25 * 60)} mins`,
      vehicleType: vehicleData?.label || "Sedan",
      additionalCharges: 0,
      totalPrice: calculatedPrice,
      breakdown: [
        `Base fare: ₹${Math.round(basePrice * multiplier)}`,
        `Distance (${distance}km): ₹${Math.round(distance * 12 * multiplier)}`,
        `Vehicle type: ${vehicleData?.label}`,
        `Includes: Driver, Fuel, Tolls`
      ]
    };
  };

  const calculateIntercityPrice = (destination: string, vehicle: string, isReturn: boolean): PricingResult => {
    const dest = intercityDestinations.find(d => d.value === destination);
    const vehicleData = vehicles.find(v => v.value === vehicle);
    
    if (!dest || !vehicleData) {
      return {
        basePrice: 0,
        distance: 0,
        duration: "0",
        vehicleType: "",
        additionalCharges: 0,
        totalPrice: 0,
        breakdown: []
      };
    }

    const basePrice = Math.round(dest.basePrice * vehicleData.priceMultiplier);
    const returnMultiplier = isReturn ? 1.8 : 1; // Return trips are less than 2x due to efficiency
    const totalPrice = Math.round(basePrice * returnMultiplier);
    const duration = isReturn ? `${Math.round(dest.distance / 60 * 2 + 8)} hours` : `${Math.round(dest.distance / 60)} hours`;

    return {
      basePrice,
      distance: dest.distance * (isReturn ? 2 : 1),
      duration,
      vehicleType: vehicleData.label,
      additionalCharges: 0,
      totalPrice,
      breakdown: [
        `Base fare to ${dest.label}: ₹${basePrice}`,
        isReturn ? `Return journey: ₹${Math.round(basePrice * 0.8)}` : '',
        `Driver allowance included`,
        `Tolls included`,
        `Fuel included`
      ].filter(Boolean)
    };
  };

  const calculateRentalPrice = (duration: string, vehicle: string): PricingResult => {
    const pkg = rentalPackages.find(p => p.value === duration);
    const vehicleData = vehicles.find(v => v.value === vehicle);
    
    if (!pkg || !vehicleData) {
      return {
        basePrice: 0,
        distance: 0,
        duration: "0",
        vehicleType: "",
        additionalCharges: 0,
        totalPrice: 0,
        breakdown: []
      };
    }

    const totalPrice = Math.round(pkg.basePrice * vehicleData.priceMultiplier);
    const estimatedKm = pkg.value === "4-hours" ? 40 : pkg.value === "8-hours" ? 80 : pkg.value === "12-hours" ? 120 : 200;

    return {
      basePrice: pkg.basePrice,
      distance: estimatedKm,
      duration: pkg.label,
      vehicleType: vehicleData.label,
      additionalCharges: 0,
      totalPrice,
      breakdown: [
        `${pkg.label} package: ₹${pkg.basePrice}`,
        `Vehicle: ${vehicleData.label} (${vehicleData.priceMultiplier}x)`,
        `Estimated distance: ${estimatedKm}km included`,
        `Driver allowance included`,
        `Fuel included`
      ]
    };
  };

  const calculatePrice = () => {
    if (!vehicleType) return;

    let result: PricingResult;

    if (bookingType === "rental") {
      if (!rentalDuration) return;
      result = calculateRentalPrice(rentalDuration, vehicleType);
    } else {
      if (!pickup) return;
      
      if (bookingType === "one-way") {
        if (!dropoff) return;
        
        // Check if it's intercity
        const isIntercity = intercityDestinations.some(d => d.value === dropoff);
        if (isIntercity) {
          result = calculateIntercityPrice(dropoff, vehicleType, false);
        } else {
          const pickupLocation = puneLocations.find(l => l.value === pickup);
          const dropoffLocation = puneLocations.find(l => l.value === dropoff);
          if (!pickupLocation || !dropoffLocation) return;
          result = calculateLocalPrice(pickupLocation.zone, dropoffLocation.zone, vehicleType);
        }
      } else { // return trip
        if (!dropoff) return;
        const isIntercity = intercityDestinations.some(d => d.value === dropoff);
        if (isIntercity) {
          result = calculateIntercityPrice(dropoff, vehicleType, true);
        } else {
          const pickupLocation = puneLocations.find(l => l.value === pickup);
          const dropoffLocation = puneLocations.find(l => l.value === dropoff);
          if (!pickupLocation || !dropoffLocation) return;
          const oneWay = calculateLocalPrice(pickupLocation.zone, dropoffLocation.zone, vehicleType);
          result = {
            ...oneWay,
            totalPrice: Math.round(oneWay.totalPrice * 1.8),
            breakdown: [
              ...oneWay.breakdown,
              "Return journey: 80% of one-way fare",
              "Total includes both trips"
            ]
          };
        }
      }
    }

    setPricing(result);
  };

  const resetCalculator = () => {
    setPickup("");
    setDropoff("");
    setVehicleType("");
    setPassengerCount("");
    setRentalDuration("");
    setPricing(null);
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Instant Fare Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get transparent pricing for your journey. No hidden charges, no surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Calculate Your Fare
              </CardTitle>
              <CardDescription>
                Select your trip details to get an instant price estimate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={bookingType} onValueChange={(value) => { setBookingType(value as "one-way" | "return" | "rental"); resetCalculator(); }}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="return">Round Trip</TabsTrigger>
                  <TabsTrigger value="rental">Rental</TabsTrigger>
                </TabsList>

                <TabsContent value="one-way" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1 text-green-600" />
                        Pickup Location
                      </label>
                      <Select value={pickup} onValueChange={setPickup}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pickup" />
                        </SelectTrigger>
                        <SelectContent>
                          {puneLocations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1 text-red-600" />
                        Drop-off Location
                      </label>
                      <Select value={dropoff} onValueChange={setDropoff}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <optgroup label="Within Pune">
                            {puneLocations.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                          <optgroup label="Intercity">
                            {intercityDestinations.map((dest) => (
                              <SelectItem key={dest.value} value={dest.value}>
                                {dest.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="return" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1 text-green-600" />
                        Pickup Location
                      </label>
                      <Select value={pickup} onValueChange={setPickup}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pickup" />
                        </SelectTrigger>
                        <SelectContent>
                          {puneLocations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Route className="w-4 h-4 inline mr-1 text-blue-600" />
                        Destination
                      </label>
                      <Select value={dropoff} onValueChange={setDropoff}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <optgroup label="Within Pune">
                            {puneLocations.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                          <optgroup label="Intercity">
                            {intercityDestinations.map((dest) => (
                              <SelectItem key={dest.value} value={dest.value}>
                                {dest.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rental" className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Timer className="w-4 h-4 inline mr-1 text-purple-600" />
                      Rental Duration
                    </label>
                    <Select value={rentalDuration} onValueChange={setRentalDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {rentalPackages.map((pkg) => (
                          <SelectItem key={pkg.value} value={pkg.value}>
                            {pkg.label} - ₹{pkg.basePrice}+ (base)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Car className="w-4 h-4 inline mr-1" />
                    Vehicle Type
                  </label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          <div>
                            <div className="font-medium">{vehicle.label}</div>
                            <div className="text-sm text-gray-500">{vehicle.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Passengers
                  </label>
                  <Select value={passengerCount} onValueChange={setPassengerCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many?" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} {count === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={calculatePrice} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Fare
                </Button>
                <Button onClick={resetCalculator} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Result */}
          <div className="space-y-6">
            {pricing ? (
              <Card className="shadow-xl border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Estimated Fare: ₹{pricing.totalPrice}
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    {pricing.vehicleType} • {pricing.duration} • {pricing.distance}km
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fare Breakdown:</h4>
                    {pricing.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Amount:</span>
                        <span className="text-green-600">₹{pricing.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Note:</strong> This is an estimated fare. Final price may vary based on actual distance, traffic conditions, and additional requirements.
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Book This Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-gray-200">
                <CardContent className="p-8 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">
                    Fill in your trip details on the left to get an instant fare estimate.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pricing Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional driver</li>
                    <li>• Fuel charges</li>
                    <li>• Toll fees (most routes)</li>
                    <li>• Basic insurance coverage</li>
                    <li>• 15 minutes waiting time</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Additional Charges:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Waiting time: ₹2/minute after 15 mins</li>
                    <li>• Night charges: 25% extra (11 PM - 6 AM)</li>
                    <li>• Parking fees at destination</li>
                    <li>• State border taxes (if applicable)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}