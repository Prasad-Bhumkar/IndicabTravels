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
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ success: false, message: "Failed to fetch contact messages" });
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
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
