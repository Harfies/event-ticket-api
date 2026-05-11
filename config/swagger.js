const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Event Ticket API",
      version: "1.0.0",
      description:
        "Production-ready event ticketing backend with payments, QR verification, email delivery, logging, and metrics.",

      contact: {
        name: "Afeez Akinsola",
        email: "akinsolaafeez82@gmail.com",
      },
    },

    servers: [
      {
        url: "https://event-ticket-api.onrender.com",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
