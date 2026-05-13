const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const validate = require("../middleware/validate");

const { initializePaymentSchema } = require("../validators/paymentValidator");

const paymentController = require("../controllers/paymentController");

const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many payment attempts",
  },
});

router.post(
  "/initialize",
  paymentLimiter,
  validate(initializePaymentSchema),
  paymentController.initializePayment,
);

router.post("/webhook", paymentController.handleWebhook);

module.exports = router;
