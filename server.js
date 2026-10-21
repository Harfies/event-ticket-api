require("dotenv").config();
const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const morgan = require("morgan");
const logger = require("./utils/logger");
const { httpRequestDuration } = require("./utils/metric");
const { swaggerUi, specs } = require("./config/swagger");
const authRoute = require("./routes/authRoute");

const app = express();

app.set("trust proxy", 1);

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith("/api/v1/payment/webhook")) {
        req.rawBody = Buffer.from(buf);
      }
    },
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// send morgan logs into winston
const stream = {
  write: (message) => logger.info(message.trim()),
};

// middleware to read JSON body
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

app.use("/api", apiLimiter);

// connect to DB
const connectDB = require("./config/db");
connectDB();

// must be LAST middleware
app.use(errorHandler);

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/events", require("./routes/eventRoutes"));
app.use("/api/v1/payment", require("./routes/paymentRoutes"));
app.use("/api/v1/tickets", require("./routes/ticketRoutes"));
app.use(
  "/api/v1/payment/webhook",
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
