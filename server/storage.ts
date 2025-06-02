import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
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
  getAllContactMessages(filter?: any, options?: any): Promise<any[]>;
  createBooking(booking: any): Promise<any>;
  getAllBookings(filter?: any, options?: any): Promise<any[]>;
  updateBookingStatus(bookingId: string, status: string): Promise<any>;
  markMessageResolved(messageId: string): Promise<any>;
  getBookingStatusCounts(): Promise<any>;
  getBookingsPerDay(days?: number): Promise<any>;
}

export class MongoStorage implements IStorage {
  async createContactMessage(message: any): Promise<any> {
    const contactMessage = new ContactMessageModel(message);
    return await contactMessage.save();
  }

  async createBooking(booking: any): Promise<any> {
    const newBooking = new BookingModel(booking);
    return await newBooking.save();
  }

  async getAllBookings(filter: any = {}, options: any = {}): Promise<any[]> {
    const query = BookingModel.find(filter);

    if (options.sortBy && options.sortOrder) {
      const sort: any = {};
      sort[options.sortBy] = options.sortOrder === 'desc' ? -1 : 1;
      query.sort(sort);
    } else {
      query.sort({ createdAt: -1 });
    }

    if (options.page && options.limit) {
      const page = parseInt(options.page, 10) || 1;
      const limit = parseInt(options.limit, 10) || 10;
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);
    }

    return await query.exec();
  }

  async getBookingStatusCounts(): Promise<any> {
    return await BookingModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]).exec();
  }

  async getBookingsPerDay(days: number = 7): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    return await BookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).exec();
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<any> {
    return await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).exec();
  }

  async getAllContactMessages(filter: any = {}, options: any = {}): Promise<any[]> {
    const query = ContactMessageModel.find(filter);

    if (options.sortBy && options.sortOrder) {
      const sort: any = {};
      sort[options.sortBy] = options.sortOrder === 'desc' ? -1 : 1;
      query.sort(sort);
    } else {
      query.sort({ createdAt: -1 });
    }

    if (options.page && options.limit) {
      const page = parseInt(options.page, 10) || 1;
      const limit = parseInt(options.limit, 10) || 10;
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);
    }

    return await query.exec();
  }

  async markMessageResolved(messageId: string): Promise<any> {
    return await ContactMessageModel.findByIdAndUpdate(
      messageId,
      { resolved: true },
      { new: true }
    ).exec();
  }
}

export const storage = new MongoStorage();
