# API Endpoints and Testing Commands Documentation

This document lists the API endpoints tested and the curl commands used for testing validation, authentication, and data retrieval.

---

## Contact Form API

### Endpoint: POST /api/contact

- Description: Submit a contact message.
- Validation: Requires `name` (non-empty string), `email` (valid email), and `message` (non-empty string).

### Test Command (Invalid Input)

```bash
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"","email":"invalid-email","message":""}' -v
```

- Expected Result: 400 Bad Request with validation errors.

---

## Bookings API

### Endpoint: POST /api/bookings

- Description: Create a new booking.
- Validation: Requires `customerName`, `customerEmail` (valid email), `pickupLocation`, `pickupDate`, `pickupTime`, `status`, and other optional fields.

### Test Command (Invalid Input)

```bash
curl -X POST http://localhost:5000/api/bookings \
-H "Content-Type: application/json" \
-d '{"customerName":"","customerEmail":"invalid-email","pickupLocation":"","pickupDate":"2025-06-01","pickupTime":"10:00","status":"pending"}' -v
```

- Expected Result: 400 Bad Request with validation errors.

### Test Command (Valid Input)

```bash
curl -X POST http://localhost:5000/api/bookings \
-H "Content-Type: application/json" \
-d '{"customerName":"John Doe","customerEmail":"john@example.com","pickupLocation":"Location A","dropoffLocation":"Location B","pickupDate":"2025-06-10","pickupTime":"10:00","returnDate":"2025-06-15","returnTime":"18:00","rentalDuration":5,"specialRequests":"None","status":"pending","estimatedFare":100}' -v
```

- Expected Result: 200 OK with success message and booking ID.

---

## Admin Endpoints (Require Authorization)

### Endpoint: GET /api/contact-messages

- Description: Retrieve all contact messages.
- Header: `Authorization: Bearer admin-token`

### Test Command

```bash
curl -X GET http://localhost:5000/api/contact-messages \
-H "Authorization: Bearer admin-token" -v
```

- Expected Result: 200 OK with list of contact messages.

### Endpoint: PATCH /api/contact-messages/:id/resolve

- Description: Mark a contact message as resolved.
- Header: `Authorization: Bearer admin-token`

### Test Command

```bash
curl -X PATCH http://localhost:5000/api/contact-messages/1234567890abcdef/resolve \
-H "Authorization: Bearer admin-token" -v
```

- Expected Result: 200 OK with success message and updated message data.

### Endpoint: GET /api/bookings

- Description: Retrieve all bookings.
- Header: `Authorization: Bearer admin-token`

### Test Command

```bash
curl -X GET http://localhost:5000/api/bookings \
-H "Authorization: Bearer admin-token" -v
```

- Expected Result: 200 OK with list of bookings.

### Endpoint: PATCH /api/bookings/:id/status

- Description: Update booking status.
- Header: `Authorization: Bearer admin-token`
- Body: JSON with `status` field.

### Test Command

```bash
curl -X PATCH http://localhost:5000/api/bookings/1234567890abcdef/status \
-H "Authorization: Bearer admin-token" \
-H "Content-Type: application/json" \
-d '{"status":"confirmed"}' -v
```

- Expected Result: 200 OK with success message and updated booking data.

---

## Frontend URLs

- `/` - Home page
- `/admin` - Admin page
- All other paths lead to the NotFound page.

---

# Notes

- All endpoints require the server to be running locally on port 5000.
- Validation errors return HTTP 400 with detailed error messages.
- Authorization header is required for admin endpoints.
