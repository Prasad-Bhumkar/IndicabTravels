import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactMessage = await storage.createContactMessage(req.body);
      res.json({ success: true, message: "Contact message received successfully", id: contactMessage._id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to save contact message" 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact messages" 
      });
    }
  });

  // Booking submission endpoint
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = await storage.createBooking(req.body);
      res.json({ success: true, message: "Booking created successfully", id: booking._id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        console.error("Error creating booking:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create booking" 
        });
      }
    }
  });

  // Get all bookings (for admin purposes)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch bookings" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
