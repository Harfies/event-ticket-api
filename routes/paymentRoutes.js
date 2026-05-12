/*const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const validate = require("../middleware/validate");

const { initializePaymentSchema } = require("../validators/paymentValidator");

const paymentController = require("../controllers/paymentController");

// ===============================
// RATE LIMITER
// ===============================
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many payment attempts, slow down",
  },
});

// ===============================
// SWAGGER TAG
// ===============================

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment and webhook endpoints
 */

// ===============================
// INITIALIZE PAYMENT
// ===============================

/**
 * @swagger
 * /api/payment/initialize:
 *   post:
 *     summary: Initialize Paystack payment
 *     description: Initializes a payment transaction for an event ticket purchase.
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
 *                 example: user@gmail.com
 *               eventId:
 *                 type: string
 *                 example: 682fd8e76a2b1c00123abcde
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 *       429:
 *         description: Too many payment attempts
 *       500:
 *         description: Payment initialization failed
 */
/*
router.post(
  "/initialize",
  paymentLimiter,
  validate(initializePaymentSchema),
  paymentController.initializePayment,
);

// ===============================
// PAYSTACK WEBHOOK
// ===============================

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Paystack webhook endpoint
 *     description: Handles Paystack webhook events after successful payments.
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       401:
 *         description: Invalid webhook signature
 *       500:
 *         description: Webhook processing failed
 */
/*
router.post("/webhook", paymentController.handleWebhook);

// ===============================
// EXPORT ROUTER
// ===============================
module.exports = router;

*/

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
 *   - name: Payments
 *     description: Payment endpoints
 */

/**
 * @swagger
 * /api/payment/initialize:
 *   post:
 *     summary: Initialize payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               eventId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment initialized
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
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
 *     summary: Paystack webhook
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post("/webhook", paymentController.handleWebhook);

module.exports = router;
