import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Car,
  ArrowRight,
  MessageSquare,
  BarChart3,
  CheckCircle,
  XCircle,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  _id?: string;
  customerName: string;
  customerEmail: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  rentalDuration?: number;
  specialRequests?: string;
  status: string;
  estimatedFare?: number;
  createdAt: string;
}

interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string; // Added phone field to match usage in handleCall
  message: string;
  createdAt: string;
}

export default function Admin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: bookingStatusCounts = [], isLoading: statusCountsLoading } = useQuery({
    queryKey: ["/api/bookings/status-counts"],
  });

  const { data: bookingsPerDay = [], isLoading: bookingsPerDayLoading } = useQuery({
    queryKey: ["/api/bookings/per-day"],
  });

  const { data: contactMessages = [], isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  // Fix useMutation for booking status
  const updateBookingStatusMutation = useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: string }) => {
      console.log("Updating booking status with headers:", {
        "Content-Type": "application/json",
        "Authorization": "Bearer admin-token"
      });
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer admin-token"
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "Success", description: "Booking status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update booking status", variant: "destructive" });
    },
  });

  const markMessageResolvedMutation = useMutation({
    mutationFn: async (messageId: string) => {
      console.log("Marking message resolved with headers:", {
        "Authorization": "Bearer admin-token"
      });
      const response = await fetch(`/api/contact-messages/${messageId}/resolve`, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer admin-token"
        }
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to mark message as resolved. Status: ${response.status}, Body: ${errorBody}`);
        throw new Error("Failed to mark message as resolved");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
      toast({ title: "Success", description: "Message marked as resolved" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to mark message as resolved", variant: "destructive" });
    },
  });
  // Removed getBookingTypeLabel as bookingType no longer exists

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const totalBookings = (bookings as Booking[]).length;
  const pendingBookings = (bookings as Booking[]).filter((b: Booking) => b.status === 'pending').length;
  const todayBookings = (bookings as Booking[]).filter((b: Booking) => 
    new Date(b.pickupDate).toDateString() === new Date().toDateString()
  ).length;
  const totalMessages = (contactMessages as ContactMessage[]).length;

  // Transform bookingStatusCounts to a map for easy access
  const statusCountMap = Array.isArray(bookingStatusCounts)
    ? bookingStatusCounts.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    : {};

  const handleConfirm = (bookingId: string) => {
    updateBookingStatusMutation.mutate({ bookingId, status: "confirmed" });
  };

  const handleCancel = (bookingId: string) => {
    updateBookingStatusMutation.mutate({ bookingId, status: "cancelled" });
  };

  const handleContactCustomer = (booking: Booking) => {
    window.location.href = `mailto:${booking.customerEmail}`;
  };

  const handleReply = (message: ContactMessage) => {
    window.location.href = `mailto:${message.email}`;
  };

  const handleCall = (message: ContactMessage) => {
    // Fix: use phone number instead of email for call
    window.location.href = `tel:${message.phone || ''}`;
  };

  const handleMarkResolved = (messageId: string) => {
    if (!messageId) {
      console.error("Invalid messageId passed to handleMarkResolved:", messageId);
      toast({ title: "Error", description: "Invalid message ID", variant: "destructive" });
      return;
    }
    markMessageResolvedMutation.mutate(messageId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Indicab Travels - Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings, messages, and business analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      {/* Add Booking Status Counts Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed Bookings</p>
              <p className="text-2xl font-bold text-green-600">{statusCountMap.confirmed || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled Bookings</p>
              <p className="text-2xl font-bold text-red-600">{statusCountMap.cancelled || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Bookings</p>
              <p className="text-2xl font-bold text-blue-600">{statusCountMap.completed || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCountMap.pending || 0}</p>
            </div>
            <Timer className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
                </div>
                <Timer className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Trips</p>
                  <p className="text-2xl font-bold text-green-600">{todayBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Messages</p>
                  <p className="text-2xl font-bold text-purple-600">{totalMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">Bookings Management</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Manage and track all booking requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="text-center py-8">Loading bookings...</div>
                ) : (bookings as Booking[]).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No bookings yet</div>
                ) : (
                  <div className="space-y-4">
                    {(bookings as Booking[]).map((booking: Booking) => (
                      <div key={booking._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            {/* Removed bookingType badge as it does not exist in backend */}
                            <span className="text-sm text-gray-500">
                              Booking #{booking._id}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(booking.createdAt)}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                            {/* Removed customerPhone as it does not exist in backend */}
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-3 h-3 mr-1" />
                              {booking.customerEmail}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <MapPin className="w-3 h-3 mr-1 text-green-600" />
                              {booking.pickupLocation}
                            </div>
                            {booking.dropoffLocation && (
                              <div className="flex items-center text-sm text-gray-600">
                                <ArrowRight className="w-3 h-3 mr-1" />
                                {booking.dropoffLocation}
                              </div>
                            )}
                            {booking.rentalDuration && (
                              <div className="text-sm text-gray-600">
                                Duration: {booking.rentalDuration}
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(booking.pickupDate)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTime(booking.pickupTime)}
                            </div>
                            {booking.returnDate && (
                              <div className="text-sm text-gray-600">
                                Return: {formatDate(booking.returnDate)} at {booking.returnTime ? formatTime(booking.returnTime) : 'TBD'}
                              </div>
                            )}
                          </div>

                          <div>
                            {/* Removed vehicleType and passengerCount as they do not exist in backend */}
                          </div>
                        </div>

                        {booking.specialRequests && (
                          <div className="bg-gray-50 rounded p-2 mb-3">
                            <p className="text-sm text-gray-700">
                              <strong>Special Requests:</strong> {booking.specialRequests}
                            </p>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleConfirm(booking._id!)}
                            disabled={updateBookingStatusMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleCancel(booking._id!)}
                            disabled={updateBookingStatusMutation.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleContactCustomer(booking)}
                          >
                            Contact Customer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>
                  Customer inquiries and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">Loading messages...</div>
                ) : (contactMessages as ContactMessage[]).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No messages yet</div>
                ) : (
                  <div className="space-y-4">
                    {(contactMessages as ContactMessage[]).map((message: ContactMessage) => (
                      <div key={message._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline">{/* No inquiryType in backend */}</Badge>
                            <Badge variant="secondary">{/* No contactMethod in backend */}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="font-medium text-gray-900 mb-1">{message.name}</p>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {message.email}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <p className="text-sm text-gray-700">{message.message}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReply(message)}
                          >
                            Reply via Email
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCall(message)}
                          >
                            Call Customer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-gray-600"
                            onClick={() => handleMarkResolved(message._id!)}
                            disabled={markMessageResolvedMutation.isPending}
                          >
                            Mark as Resolved
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
