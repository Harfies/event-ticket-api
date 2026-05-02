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

const paymentController = require("../controllers/paymentController");

// initialize payment
router.post("/initialize", paymentController.initializePayment);

// verify payment
//router.post("/verify", paymentController.verifyPayment);

router.post("/webhook", paymentController.handleWebhook);

// export router (VERY IMPORTANT)
module.exports = router;
