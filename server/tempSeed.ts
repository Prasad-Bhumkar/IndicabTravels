import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL as string;

mongoose.set('strictQuery', false);

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const bookingSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  pickupLocation: String,
  dropoffLocation: { type: String, default: null },
  pickupDate: Date,
  pickupTime: String,
  returnDate: { type: Date, default: null },
  returnTime: { type: String, default: null },
  rentalDuration: { type: Number, default: null },
  specialRequests: { type: String, default: null },
  status: { type: String, default: "pending" },
  estimatedFare: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessageModel = mongoose.model("ContactMessage", contactMessageSchema);
const BookingModel = mongoose.model("Booking", bookingSchema);

async function seed() {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully");

    // Insert sample contact messages
    await ContactMessageModel.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        message: "I am interested in your services.",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        message: "Can you provide more details about the booking process?",
      },
    ]);

    // Insert sample bookings
    await BookingModel.insertMany([
      {
        customerName: "Alice Johnson",
        customerEmail: "alice@example.com",
        pickupLocation: "Downtown",
        dropoffLocation: "Airport",
        pickupDate: new Date("2024-07-01"),
        pickupTime: "10:00 AM",
        returnDate: new Date("2024-07-05"),
        returnTime: "4:00 PM",
        rentalDuration: 4,
        specialRequests: "Child seat",
        status: "confirmed",
        estimatedFare: 150,
      },
      {
        customerName: "Bob Williams",
        customerEmail: "bob@example.com",
        pickupLocation: "Hotel",
        dropoffLocation: "Train Station",
        pickupDate: new Date("2024-07-10"),
        pickupTime: "2:00 PM",
        status: "pending",
        estimatedFare: 80,
      },
    ]);

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
