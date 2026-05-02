const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Ticket Booking API",
      version: "1.0.0",
      description: "API for booking events, payments, and ticket verification",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://event-ticket-api.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // where your routes are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
