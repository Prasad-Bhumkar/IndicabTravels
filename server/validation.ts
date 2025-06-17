import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const bookingSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().optional().nullable(),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  returnDate: z.string().optional().nullable(),
  returnTime: z.string().optional().nullable(),
  rentalDuration: z.number().optional().nullable(),
  specialRequests: z.string().optional().nullable(),
  status: z.string().optional().default("pending"),
  estimatedFare: z.number().optional().nullable(),
});
