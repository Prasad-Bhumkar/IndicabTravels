export interface InsertBooking {
  bookingType: "one-way" | "return" | "rental";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  rentalDuration?: string;
  vehicleType: string;
  passengerCount: number;
  specialRequests?: string;
}

export interface InsertContactMessage {
  name: string;
  email: string;
  inquiryType: "booking" | "corporate" | "general" | "feedback";
  contactMethod: "email" | "phone" | "whatsapp";
  message: string;
}
