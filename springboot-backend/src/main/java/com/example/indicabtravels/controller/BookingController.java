package com.example.indicabtravels.controller;

import com.example.indicabtravels.entity.Booking;
import com.example.indicabtravels.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/status-counts")
    public ResponseEntity<List<Map<String, Object>>> getBookingStatusCounts() {
        List<Map<String, Object>> statusCounts = bookingService.getBookingStatusCounts();
        return ResponseEntity.ok(statusCounts);
    }

    @GetMapping("/per-day")
    public ResponseEntity<List<Map<String, Object>>> getBookingsPerDay() {
        List<Map<String, Object>> bookingsPerDay = bookingService.getBookingsPerDay();
        return ResponseEntity.ok(bookingsPerDay);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable String id, @RequestBody String status) {
        Booking updatedBooking = bookingService.updateBookingStatus(id, status);
        if (updatedBooking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedBooking);
    }
}
