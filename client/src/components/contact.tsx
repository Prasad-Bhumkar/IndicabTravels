import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InsertContactMessage } from "@/types/api";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Send, AlertTriangle } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "booking",
      contactMethod: "email",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you within 2 hours.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    submitContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to book your next trip? We're here to help with all your transportation needs in Pune.
          </p>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div className="mb-12 lg:mb-0">
            <div className="bg-white rounded-xl p-8 text-gray-900">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Inquiry *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="booking">Booking Inquiry</SelectItem>
                              <SelectItem value="corporate">Corporate Travel</SelectItem>
                              <SelectItem value="general">General Question</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Tell us about your travel needs, destination, dates, number of passengers, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 transition-colors transform hover:scale-105 duration-200"
                    disabled={submitContactMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                    <p className="text-gray-300">+91-9876543210</p>
                    <p className="text-sm text-gray-400">Available 24/7 for bookings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                    <p className="text-gray-300">info@indicabtravels.com</p>
                    <p className="text-sm text-gray-400">We respond within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Service Area</h4>
                    <p className="text-gray-300">All of Pune & PCMC</p>
                    <p className="text-sm text-gray-400">Kothrud, Baner, Hinjewadi, Hadapsar & more</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                    <p className="text-gray-300">+91-9876543210</p>
                    <p className="text-sm text-gray-400">Quick bookings & updates</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Sunday:</span>
                    <span className="text-white">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Phone Support:</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email Response:</span>
                    <span className="text-white">Within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="bg-red-600 bg-opacity-20 border border-red-500 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Emergency Contact
              </h4>
              <p className="text-sm text-gray-300">For urgent bookings or travel assistance</p>
              <p className="text-white font-semibold">+91-9876543210</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
