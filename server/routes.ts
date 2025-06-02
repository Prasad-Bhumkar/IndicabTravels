import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactMessageSchema, bookingSchema } from "./validation";

function validate(schema: any) {
  return (req: any, res: any, next: any) => {
    console.log("Validation middleware called with body:", req.body);
    try {
      const parsed = schema.parse(req.body);
      console.log("Validation passed, parsed body:", parsed);
      req.body = parsed;
      next();
    } catch (error) {
      console.log("Validation failed with error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
}

// Dummy authentication middleware for demonstration
function authenticate(req: any, res: any, next: any) {
  // In real app, implement proper authentication here
  const authHeader = req.headers.authorization;
  console.log("Authentication header received:", authHeader);
  if (authHeader === "Bearer admin-token") {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}


export async function registerRoutes(app: Express): Promise<Server> {
  // Add express.json() middleware here to ensure body is parsed before validation
  app.use(express.json());

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Request body at route handler:", req.body);
      const parsed = contactMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        console.log("Validation errors:", parsed.error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: parsed.error.errors,
        });
      }
      const contactMessage = await storage.createContactMessage(parsed.data);
      res.json({ success: true, message: "Contact message received successfully", id: contactMessage._id });
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ success: false, message: "Failed to save contact message" });
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact-messages", authenticate, async (req, res) => {
    try {
      const { page, limit, sortBy, sortOrder, inquiryType, contactMethod } = req.query;

      const filter: any = {};
      if (inquiryType) filter.inquiryType = inquiryType;
      if (contactMethod) filter.contactMethod = contactMethod;

      const options = {
        page,
        limit,
        sortBy,
        sortOrder,
      };

      const messages = await storage.getAllContactMessages(filter, options);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ success: false, message: "Failed to fetch contact messages" });
    }
  });

  // Get booking status counts for analytics
  app.get("/api/bookings/status-counts", authenticate, async (req, res) => {
    try {
      const counts = await storage.getBookingStatusCounts();
      res.json(counts);
    } catch (error) {
      console.error("Error fetching booking status counts:", error);
      res.status(500).json({ success: false, message: "Failed to fetch booking status counts" });
    }
  });

  // Get bookings per day for analytics
  app.get("/api/bookings/per-day", authenticate, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const bookingsPerDay = await storage.getBookingsPerDay(days);
      res.json(bookingsPerDay);
    } catch (error) {
      console.error("Error fetching bookings per day:", error);
      res.status(500).json({ success: false, message: "Failed to fetch bookings per day" });
    }
  });

  // Mark contact message as resolved
  app.patch("/api/contact-messages/:id/resolve", authenticate, async (req, res) => {
    try {
      const messageId = req.params.id;
      console.log(`Marking message as resolved, messageId: ${messageId}`);
      const updatedMessage = await storage.markMessageResolved(messageId);
      if (!updatedMessage) {
        console.warn(`Message not found for id: ${messageId}`);
        return res.status(404).json({ success: false, message: "Message not found" });
      }
      console.log(`Message marked as resolved: ${JSON.stringify(updatedMessage)}`);
      res.json({ success: true, message: "Message marked as resolved", data: updatedMessage });
    } catch (error) {
      console.error("Error marking message as resolved:", error);
      res.status(500).json({ success: false, message: "Failed to mark message as resolved" });
    }
  });

  // Booking submission endpoint
  app.post("/api/bookings", validate(bookingSchema), async (req, res) => {
    try {
      const booking = await storage.createBooking(req.body);
      res.json({ success: true, message: "Booking created successfully", id: booking._id });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ success: false, message: "Failed to create booking" });
    }
  });

  // Get all bookings (for admin purposes)
  app.get("/api/bookings", authenticate, async (req, res) => {
    try {
      const { page, limit, sortBy, sortOrder, status, bookingType } = req.query;

      const filter: any = {};
      if (status) filter.status = status;
      if (bookingType) filter.bookingType = bookingType;

      const options = {
        page,
        limit,
        sortBy,
        sortOrder,
      };

      const bookings = await storage.getAllBookings(filter, options);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", authenticate, async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }
      const updatedBooking = await storage.updateBookingStatus(bookingId, status);
      if (!updatedBooking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
      res.json({ success: true, message: "Booking status updated", data: updatedBooking });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ success: false, message: "Failed to update booking status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
