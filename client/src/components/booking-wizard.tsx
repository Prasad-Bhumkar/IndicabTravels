import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Car, 
  Phone, 
  Mail, 
  User,
  RotateCcw,
  Timer
} from "lucide-react";
import type { InsertBooking } from "@/types/api";

export default function BookingWizard() {
  const [bookingType, setBookingType] = useState<"one-way" | "return" | "rental">("one-way");
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    defaultValues: {
      bookingType: "one-way",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      rentalDuration: "",
      vehicleType: "",
      passengerCount: 1,
      specialRequests: "",
    },
  });

  const submitBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted!",
        description: "Thank you! We'll contact you within 30 minutes to confirm your booking.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    const bookingData = {
      ...data,
      bookingType,
      // Clear fields not relevant to the booking type
      ...(bookingType === "one-way" && { 
        returnDate: undefined, 
        returnTime: undefined, 
        rentalDuration: undefined 
      }),
      ...(bookingType === "return" && { 
        rentalDuration: undefined 
      }),
      ...(bookingType === "rental" && { 
        dropoffLocation: undefined, 
        returnDate: undefined, 
        returnTime: undefined 
      }),
    };
    submitBookingMutation.mutate(bookingData);
  };

  const handleBookingTypeChange = (value: string) => {
    const type = value as "one-way" | "return" | "rental";
    setBookingType(type);
    form.setValue("bookingType", type);
    // Clear fields that don't apply to the new booking type
    if (type === "one-way") {
      form.setValue("returnDate", "");
      form.setValue("returnTime", "");
      form.setValue("rentalDuration", "");
    } else if (type === "return") {
      form.setValue("rentalDuration", "");
    } else if (type === "rental") {
      form.setValue("dropoffLocation", "");
      form.setValue("returnDate", "");
      form.setValue("returnTime", "");
    }
  };

  const puneLocations = [
    "Pune Airport (PNQ)",
    "Pune Railway Station",
    "Shivajinagar",
    "Koregaon Park",
    "Baner",
    "Kothrud",
    "Hadapsar",
    "Hinjewadi IT Park",
    "Magarpatta City",
    "Wakad",
    "Aundh",
    "Viman Nagar",
    "Kharadi",
    "Pimpri Chinchwad",
    "Deccan Gymkhana",
    "Camp Area",
    "Swargate",
    "Katraj",
    "Kondhwa",
    "Dhanori"
  ];

  const vehicleTypes = [
    { value: "sedan", label: "Sedan (4 seats)", description: "Comfortable for city rides" },
    { value: "suv", label: "SUV (6-7 seats)", description: "Spacious for families" },
    { value: "tempo-traveller", label: "Tempo Traveller (12-15 seats)", description: "Perfect for groups" },
    { value: "luxury-sedan", label: "Luxury Sedan", description: "Premium comfort" },
    { value: "luxury-suv", label: "Luxury SUV", description: "Ultimate luxury experience" }
  ];

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Ride</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick and easy booking for all your travel needs in Pune
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Choose Your Journey Type
            </CardTitle>
            <CardDescription>
              Select the type of trip that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={bookingType} onValueChange={handleBookingTypeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="one-way" className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  One Way
                </TabsTrigger>
                <TabsTrigger value="return" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Round Trip
                </TabsTrigger>
                <TabsTrigger value="rental" className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Rental
                </TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Trip Type Descriptions */}
                  <TabsContent value="one-way" className="mt-0">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">One-Way Trip</h3>
                      <p className="text-blue-700 text-sm">
                        Perfect for airport transfers, station pickups, or point-to-point travel within Pune or to nearby cities.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="return" className="mt-0">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-900 mb-2">Round Trip</h3>
                      <p className="text-green-700 text-sm">
                        Ideal for day trips to Lonavala, Mumbai, or business meetings with a return journey on the same day.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="rental" className="mt-0">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-900 mb-2">Hourly Rental</h3>
                      <p className="text-yellow-700 text-sm">
                        Flexible hourly rental for city tours, shopping, multiple stops, or when you need a car at your disposal.
                      </p>
                    </div>
                  </TabsContent>

                  {/* Customer Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Pickup Location *
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup location" />
                            </SelectTrigger>
                            <SelectContent>
                              {puneLocations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dropoffLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Dropoff Location *
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dropoff location" />
                            </SelectTrigger>
                            <SelectContent>
                              {puneLocations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Pickup Date *
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Pickup Time *
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {bookingType === "return" && (
                    <>
                      <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Return Date *
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="returnTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Return Time *
                            </FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {bookingType === "rental" && (
                    <FormField
                      control={form.control}
                      name="rentalDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Rental Duration (hours) *
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={24} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Car className="w-4 h-4" />
                          Vehicle Type *
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              {vehicleTypes.map((vehicle) => (
                                <SelectItem key={vehicle.value} value={vehicle.value}>
                                  {vehicle.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passengerCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Number of Passengers *
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={15} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Badge className="w-4 h-4" />
                          Special Requests
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any special requests or instructions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Submit Booking
                  </Button>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
        </section>
      );
    }
