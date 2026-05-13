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

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment endpoints
 */

/**
 * @swagger
 * /api/payment/initialize:
 *   post:
 *     summary: Initialize Paystack payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - eventId
 *             properties:
 *               email:
 *                 type: string
 *               eventId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *
 *       404:
 *         description: Event not found
 *
 *       500:
 *         description: Payment failed
 */

router.post(
  "/initialize",
  paymentLimiter,
  validate(initializePaymentSchema),
  paymentController.initializePayment,
);

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Paystack webhook endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook received successfully
 */

router.post("/webhook", paymentController.handleWebhook);

module.exports = router;
