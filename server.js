require("dotenv").config();
const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const morgan = require("morgan");
const logger = require("./utils/logger");
const { httpRequestDuration } = require("./utils/metric");
const { swaggerUi, specs } = require("./config/swagger");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json({ limit: "10mb" })); // increase payload limit for webhook
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // for parsing application/x-www-form-urlencoded

// send morgan logs into winston
const stream = {
  write: (message) => logger.info(message.trim()),
};

// middleware to read JSON body
app.use(express.json());
app.use(morgan("combined", { stream }));
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.originalUrl,
      status: res.statusCode,
    });
  });

  next();
});

// ✅ Security middlewares
app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: ["http://localhost:3000"], // frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(limiter);

// connect to DB
const connectDB = require("./config/db");
connectDB();

// must be LAST middleware
app.use(errorHandler);

// routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/tickets", ticketRoutes);
app.use(
  "/api/payment/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);
// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  res.end(await client.register.metrics());
});

// centralized error handler
app.use((err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
