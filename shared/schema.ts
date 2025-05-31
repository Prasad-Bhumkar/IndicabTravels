import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  inquiryType: text("inquiry_type").notNull(),
  contactMethod: text("contact_method").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingType: text("booking_type").notNull(), // 'one-way', 'return', 'rental'
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location"),
  pickupDate: text("pickup_date").notNull(),
  pickupTime: text("pickup_time").notNull(),
  returnDate: text("return_date"),
  returnTime: text("return_time"),
  rentalDuration: text("rental_duration"), // for rental bookings
  vehicleType: text("vehicle_type").notNull(),
  passengerCount: integer("passenger_count").notNull(),
  specialRequests: text("special_requests"),
  estimatedFare: text("estimated_fare"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  inquiryType: true,
  contactMethod: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  bookingType: true,
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  pickupLocation: true,
  dropoffLocation: true,
  pickupDate: true,
  pickupTime: true,
  returnDate: true,
  returnTime: true,
  rentalDuration: true,
  vehicleType: true,
  passengerCount: true,
  specialRequests: true,
}).extend({
  customerEmail: z.string().email("Please enter a valid email address"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  pickupLocation: z.string().min(3, "Pickup location is required"),
  passengerCount: z.number().min(1, "At least 1 passenger required").max(8, "Maximum 8 passengers"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
