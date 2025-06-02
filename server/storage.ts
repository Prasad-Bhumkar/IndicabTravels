import mongoose from "mongoose";

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

export interface IStorage {
  createContactMessage(message: any): Promise<any>;
  getAllContactMessages(): Promise<any[]>;
  createBooking(booking: any): Promise<any>;
  getAllBookings(): Promise<any[]>;
}

export class MongoStorage implements IStorage {
  async createContactMessage(message: any): Promise<any> {
    const contactMessage = new ContactMessageModel(message);
    return await contactMessage.save();
  }

  async getAllContactMessages(): Promise<any[]> {
    return await ContactMessageModel.find().sort({ createdAt: -1 }).exec();
  }

  async createBooking(booking: any): Promise<any> {
    const newBooking = new BookingModel(booking);
    return await newBooking.save();
  }

  async getAllBookings(): Promise<any[]> {
    return await BookingModel.find().sort({ createdAt: -1 }).exec();
  }
}

export const storage = new MongoStorage();
