# Indicab Travels

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square&logo=github)](https://github.com/yourusername/indicabtravels/actions)
[![License](https://img.shields.io/badge/license-proprietary-blue?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/indicabtravels?style=flat-square)](https://www.npmjs.com/package/indicabtravels)

<p align="center">
  <a href="https://github.com/yourusername/indicabtravels" target="_blank" rel="noopener noreferrer" aria-label="Indicab Travels GitHub Repository">
    <img src="./docs/assets/logo.png" alt="Indicab Travels Logo" width="200" />
  </a>
</p>

<div align="center">
  <h1>Indicab Travels</h1>
  <p><em>Your all-in-one full-stack travel booking solution for seamless travel planning and vehicle booking.</em></p>
  <p>
    <a href="#installation-and-setup" aria-label="Get Started"><strong>Get Started »</strong></a>
    &nbsp;|&nbsp;
    <a href="#features" aria-label="Features"><strong>Features</strong></a>
    &nbsp;|&nbsp;
    <a href="#api-endpoints-overview" aria-label="API Documentation"><strong>API Docs</strong></a>
    &nbsp;|&nbsp;
    <a href="#contact--support" aria-label="Contact and Support"><strong>Contact</strong></a>
  </p>
</div>
---
## Table of Contents
- [🚀 Project Overview](#project-overview)
- [🛠️ Technology Stack](#technology-stack)
- [⚙️ Installation and Setup](#installation-and-setup)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Server (Express + TypeScript)](#server-express--typescript)
  - [Frontend (React + Vite)](#frontend-react--vite)
- [🏃 Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [📡 API Endpoints Overview](#api-endpoints-overview)
  - [Contact Messages](#contact-messages)
  - [Bookings](#bookings)
  - [Analytics](#analytics)
- [✨ Features](#features)
- [💡 Usage Examples](#usage-examples)
- [🔧 Environment Variables](#environment-variables)
- [❓ Troubleshooting & FAQ](#troubleshooting--faq)
- [🧪 Testing](#testing)
- [🤝 Contributing](#contributing)
- [📞 Contact & Support](#contact--support)
- [📄 License](#license)

---

## 🚀 Project Overview

Indicab Travels is a comprehensive, full-stack travel booking application designed to provide users with a seamless, intuitive experience for booking vehicles and managing travel plans. This project integrates:

- A robust backend built with Spring Boot 3 and Java 17, leveraging Spring Data JPA, MongoDB, and H2 for data persistence.
- A modern Express server written in TypeScript for API handling and business logic.
- A dynamic React frontend powered by Vite and styled with TailwindCSS for a responsive and accessible user interface.

Key features include user bookings, contact message submissions, and an administrative dashboard offering analytics and management capabilities.

---

## 🛠️ Technology Stack

| Layer    | Technology & Tools                                      |
| -------- | ----------------------------------------------------- |
| Backend  | Spring Boot 3, Java 17, Spring Data JPA, MongoDB, H2, Lombok, Validation API |
| Server   | Node.js, Express, TypeScript, Zod                      |
| Frontend | React 18, TypeScript, Wouter, React Query, Radix UI, TailwindCSS, Vite |
| Database | MongoDB (primary), H2 (in-memory for testing)          |
| Testing  | Jest                                                   |

---

## ⚙️ Installation and Setup

Follow these steps to set up and run the Indicab Travels application components:

### Backend (Spring Boot)

Navigate to the backend directory, build the project, and start the Spring Boot server:

```bash
cd springboot-backend
./mvnw clean install
./mvnw spring-boot:run
```

The backend service will start on the default port (usually 8080).

### Server (Express + TypeScript)

Install dependencies and start the Express server:

```bash
npm install
npm run dev
```

The server listens on port 5000 and handles API requests as well as serving the frontend in production mode.

### Frontend (React + Vite)

Navigate to the client directory, install dependencies, and start the frontend development server:

```bash
cd client
npm install
npm run dev
```

The frontend will be accessible at the configured local URL (usually http://localhost:3000).

---

## 🏃 Running the Application

### Development Mode

To run the backend, server, and frontend concurrently in development mode, execute:

```bash
npm run start:all
```

This command will start all components and enable hot-reloading for frontend and backend changes.

### Production Mode

To build the frontend and start the production server, run:

```bash
npm run build
npm start
```

The application will be served on port 5000 in production mode.

---

## 📡 API Endpoints Overview

### Contact Messages

- `POST /api/contact` - Submit a contact message from users.
- `GET /api/contact-messages` - (Admin only) Retrieve all contact messages with support for filtering and pagination.
- `PATCH /api/contact-messages/:id/resolve` - (Admin only) Mark a specific contact message as resolved.

### Bookings

- `POST /api/bookings` - Create a new vehicle booking.
- `GET /api/bookings` - (Admin only) Retrieve all bookings with filtering and pagination capabilities.
- `PATCH /api/bookings/:id/status` - (Admin only) Update the status of a booking (e.g., confirmed, cancelled).

### Analytics

- `GET /api/bookings/status-counts` - (Admin only) Retrieve counts of bookings grouped by their status.
- `GET /api/bookings/per-day` - (Admin only) Retrieve booking counts per day for a specified date range.

---

## ✨ Features

- Intuitive, user-friendly booking wizard with real-time validation.
- Contact form enabling users to submit inquiries and messages easily.
- Comprehensive admin dashboard for managing bookings and contact messages efficiently.
- Real-time analytics and reporting on booking data.
- Responsive and accessible UI built with Radix UI components and TailwindCSS.
- Robust backend powered by Spring Boot and MongoDB for reliable data management.
- API request validation using Zod schemas to ensure data integrity.
- Secure authentication middleware protecting admin routes and sensitive operations.

---

## 💡 Usage Examples

### Booking a Vehicle

1. Navigate to the Home page of the application.
2. Use the booking wizard to select your preferred vehicle type, travel dates, and other preferences.
3. Submit the booking form and receive an immediate confirmation with booking details.

### Managing Contact Messages (Admin)

1. Log in to the Admin page using authorized credentials.
2. Access the contact messages dashboard to view, filter, and manage user-submitted inquiries.
3. Mark messages as resolved once addressed to maintain organized communication.

---

## 🔧 Environment Variables

| Variable Name              | Description                                      | Required | Default       |
|----------------------------|------------------------------------------------|----------|---------------|
| `NODE_ENV`                 | Environment mode (development or production)   | Yes      | `development` |
| `PORT`                     | Port on which the server listens                | No       | `5000`        |
| `MONGODB_URI`              | Connection string for MongoDB database           | Yes      | -             |
| `SPRING_DATASOURCE_URL`    | JDBC URL for Spring Boot datasource              | Yes      | -             |
| `SPRING_DATASOURCE_USERNAME` | Username for Spring Boot datasource             | Yes      | -             |
| `SPRING_DATASOURCE_PASSWORD` | Password for Spring Boot datasource             | Yes      | -             |

---

## ❓ Troubleshooting & FAQ

**Q:** The server does not start. What should I do?  
**A:** Verify that all required environment variables are correctly set and that the database service is running.

**Q:** How do I run tests?  
**A:** Run `npm test` to execute tests with coverage reports, or `npm run test:watch` to run tests in watch mode during development.

**Q:** Can I contribute to this project?  
**A:** Absolutely! Please refer to the Contributing section for guidelines on how to contribute.

---

## 🧪 Testing

- This project uses Jest for testing both server-side and frontend components.
- To run tests with coverage reports, execute:

```bash
npm test
```

- For continuous testing during development, use watch mode:

```bash
npm run test:watch
```

---

## 🤝 Contributing

Contributions are warmly welcomed! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Follow the project's coding standards and write tests where applicable.
4. Submit a pull request with a clear description of your changes.

---

## 📞 Contact & Support

For questions, issues, or contributions, please contact the project maintainer at:

- Email: maintainer@example.com
- GitHub: [https://github.com/yourusername/indicabtravels](https://github.com/yourusername/indicabtravels)

---

## 🆘 Getting Help

If you encounter any issues or need assistance, please:

- Open an issue on the [GitHub Issues](https://github.com/yourusername/indicabtravels/issues) page.
- Join the community discussions on [GitHub Discussions](https://github.com/yourusername/indicabtravels/discussions).

---

## 📄 License

[![License](https://img.shields.io/badge/license-proprietary-blue?style=flat-square)](LICENSE)

**Proprietary License**

This project and its source code are the exclusive property of the author. Unauthorized copying, distribution, or use of this code, in whole or in part, is strictly prohibited. All rights reserved.
