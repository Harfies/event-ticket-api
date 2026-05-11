# Event Ticket API

A production-ready backend API for event ticketing built with Node.js, Express, MongoDB, and Paystack.

The system allows users to:

- Create and manage events
- Purchase tickets securely via Paystack
- Receive ticket emails with QR codes
- Verify tickets in real time
- Monitor application metrics
- Track logs and errors

---

# Features

## Event Management

- Create events
- Fetch all events
- Search events by name
- Pagination support

## Payment Processing

- Paystack payment integration
- Secure webhook verification
- Metadata handling

## Ticket System

- Automatic ticket generation
- Unique ticket IDs
- QR code generation
- Ticket verification endpoint
- Prevent duplicate ticket usage

## Email System

- Ticket confirmation emails
- QR code email attachment
- HTML email templates

## Security

- Helmet security headers
- Rate limiting
- Joi input validation
- Secure webhook signature verification
- Environment variable protection

## Observability

- Winston structured logging
- Morgan request logging
- Prometheus metrics endpoint
- Centralized error handling

---

# Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Paystack API
- Nodemailer
- QRCode
- Joi
- Winston
- Morgan
- Prometheus Client
- Swagger

---

# API Documentation

Swagger Documentation:

```bash
https://event-ticket-api.onrender.com/api-docs
```

---

# Base URL

Production:

````bash
https://event-ticket-api.onrender.com```

Local:

```bash
http://localhost:3000
````

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Harfies/event-ticket-api.git
```

## Navigate Into Project

```bash
cd event-ticket-api
```

## Install Dependencies

```bash
npm install
```

---

# Running the Project

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# API Endpoints

## Events

### Create Event

```http
POST /api/events
```

### Get Events

```http
GET /api/events
```

### Search Events

```http
GET /api/events?name=tech
```

---

## Payments

### Initialize Payment

```http
POST /api/payment/initialize
```

### Paystack Webhook

```http
POST /api/payment/webhook
```

---

## Tickets

### Verify Ticket

```http
GET /api/tickets/verify/:ticketId
```

### Get User Tickets

```http
GET /api/tickets?email=user@gmail.com
```

---

# Metrics Endpoint

Prometheus metrics:

```http
GET /metrics
```

---

# Logging

The application uses:

- Winston for structured logging
- Morgan for request logging

Log files:

```bash
logs/error.log
logs/combined.log
```

---

# Security Features

- API rate limiting
- Secure environment variables
- Joi request validation
- Helmet HTTP security
- Paystack webhook verification

---

# Deployment

Hosted on Render.

Deployment Steps:

1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy application

---

# Future Improvements

- Authentication & Authorization
- Admin dashboard
- Ticket scanning frontend
- Background jobs with queues
- Redis caching
- Analytics dashboard

---

# Author

Afeez Akinsola
github: @Harfies
email: akinsolaafeez82@gmail.com

Backend Developer

---

# License

MIT License
