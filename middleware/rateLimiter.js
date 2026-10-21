const rateLimit = require("express-rate-limit");

// General API protection
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Stricter protection for payment initialization
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many payment attempts. Please try again later.",
  },
});

module.exports = {
  apiLimiter,
  paymentLimiter,
};
