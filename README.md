# Event Ticket API

A production-ready backend API for event ticketing built with Node.js, Express, MongoDB, and Paystack.

The system allows users to:

- Create and manage events
- Purchase tickets securely via Paystack
- Receive ticket emails with QR codes
- Verify tickets in real time

---

# Features

## Event Management

- Create events
- Update events
- Delete events
- Fetch all events
- Search events by name
- Pagination support

## Authentication

- Admin registration
- Admin login
- JWT authentication
- Protected admin routes

## Payment Processing

- Paystack payment integration
- Secure webhook verification
- Metadata handling
- Webhook idempotency to prevent duplicate ticket creation

## Ticket System

- Automatic ticket generation
- Unique ticket IDs
- QR code generation
- Ticket verification endpoint
- Prevent duplicate ticket usage

## Email System

- Ticket confirmation emails
- QR code delivery
- HTML email templates

## Security

- Helmet security headers
- Rate limiting
- Joi input validation
- Secure webhook signature verification
- Environment variable protection

---

# Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Paystack API
- Nodemailer
- QRCode
- Joi
- Winston
- Morgan
- Prometheus Client
- Swagger UI

---

# API Documentation

Swagger Documentation:

https://event-ticket-api.onrender.com/api-docs

---

# Base URL

Production:

https://event-ticket-api.onrender.com

Local:

http://localhost:3000

---

# API Endpoints

## Authentication

### Register Admin

POST /api/auth/register

### Login Admin

POST /api/auth/login

---

## Events

### Create Event (Protected)

POST /api/events

### Get Events

GET /api/events

### Update Event (Protected)

PUT /api/events/:id

### Delete Event (Protected)

DELETE /api/events/:id

### Search Events

GET /api/events?name=tech

---

## Payments

### Initialize Payment

POST /api/payment/initialize

### Paystack Webhook

POST /api/payment/webhook

---

## Tickets

### Verify Ticket

GET /api/tickets/verify/:ticketId

---

# Security Features

- JWT Authentication
- Protected Admin Routes
- API Rate Limiting
- Joi Request Validation
- Helmet HTTP Security
- Paystack Webhook Verification
- Webhook Idempotency
- Secure Environment Variables

---

# Deployment

Hosted on Render.

Deployment Steps:

1. Push code to GitHub
2. Connect repository to Render
3. Configure environment variables
4. Deploy application

---

## Future Improvements

- Admin dashboard
- Ticket scanning frontend
- Analytics dashboard
- Redis caching
- BullMQ background jobs
- MongoDB sanitization & XSS protection
- Metrics & tracing
- Docker support
- Role-Based Access Control (RBAC)

---

# Author

Afeez Akinsola

GitHub: @Harfies
Email: [akinsolaafeez82@gmail.com](mailto:akinsolaafeez82@gmail.com)

Backend Developer

---

# License

MIT License
