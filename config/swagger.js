/*const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Ticket Booking API",
      version: "1.0.0",
      description:
        "Production-ready Event Ticket Booking API with Paystack integration",
      contact: {
        name: "Afeez Akinsola",
        email: "akinsolaafeez82@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
      {
        url: "https://event-ticket-api.onrender.com",
        description: "Production server",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
*/

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Event Ticket API",
      version: "1.0.0",
      description: "API documentation for Event Ticket Backend",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    // 🔥 THIS PART ADDS AUTHORIZE BUTTON
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs: swaggerSpec,
};
