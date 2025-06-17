package com.example.indicabtravels.service;

import com.example.indicabtravels.entity.Booking;
import com.example.indicabtravels.repository.BookingRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final MongoTemplate mongoTemplate;

    public BookingService(BookingRepository bookingRepository, MongoTemplate mongoTemplate) {
        this.bookingRepository = bookingRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    public Booking updateBookingStatus(String id, String status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setStatus(status);
            return bookingRepository.save(booking);
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getBookingStatusCounts() {
        GroupOperation groupByStatus = Aggregation.group("status").count().as("count");
        ProjectionOperation project = Aggregation.project("count").and("status").previousOperation();
        Aggregation aggregation = Aggregation.newAggregation(groupByStatus, project);
        AggregationResults<Map<String, Object>> results = mongoTemplate.aggregate(aggregation, "bookings", (Class<Map<String, Object>>)(Class<?>)Map.class);
        return results.getMappedResults();
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getBookingsPerDay() {
        GroupOperation groupByDate = Aggregation.group("pickupDate").count().as("count");
        ProjectionOperation project = Aggregation.project("count").and("pickupDate").previousOperation();
        SortOperation sortByDate = Aggregation.sort(Sort.Direction.ASC, "pickupDate");
        Aggregation aggregation = Aggregation.newAggregation(groupByDate, project, sortByDate);
        AggregationResults<Map<String, Object>> results = mongoTemplate.aggregate(aggregation, "bookings", (Class<Map<String, Object>>)(Class<?>)Map.class);
        return results.getMappedResults();
    }

}
