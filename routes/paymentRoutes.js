/**
 * @swagger
 * /api/payment/initialize:
 *   post:
 *     summary: Initialize payment
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment initialized
 */
/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Paystack webhook
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook received
 */
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const validate = require("../middleware/validate");

const { initializePaymentSchema } = require("../validators/paymentValidator");

const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5, // only 5 attempts
  message: "Too many payment attempts, slow down",
});

const paymentController = require("../controllers/paymentController");

// initialize payment
router.post(
  "/initialize",
  paymentLimiter,
  validate(initializePaymentSchema),
  paymentController.initializePayment,
);

// verify payment
//router.post("/verify", paymentController.verifyPayment);

router.post("/webhook", paymentController.handleWebhook);

// export router (VERY IMPORTANT)
module.exports = router;
