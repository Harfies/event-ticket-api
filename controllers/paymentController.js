const axios = require("axios");
const eventModel = require("../models/eventModel");
const sendEmail = require("../utils/sendEmail");
const Ticket = require("../models/ticketModel");
const crypto = require("crypto");
const generateQR = require("../utils/generateQR");
const ticketTemplate = require("../utils/emailTemplate");
const { getEnvironmentData } = require("worker_threads");
const asyncHandler = require("../middleware/asyncHandler");
const { initializePaymentSchema } = require("../validators/paymentValidator");
const logger = require("../utils/logger");

exports.initializePayment = asyncHandler(async (req, res) => {
  // ✅ 1. VALIDATE FIRST (TOP OF FUNCTION)
  const { error } = initializePaymentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const { email, eventId } = req.body;

    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const amount = event.price * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        metadata: {
          eventID: event._id.toString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    logger.info("Payment initialized successfully", {
      email,
      eventId,
      amount,
    });
    res.json(response.data);
  } catch (error) {
    logger.error("Payment initialization failed", {
      message: error.message,
      paystackError: error.response?.data,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Payment failed",
    });
  }
});

// SECURE WEBHOOK
exports.handleWebhook = asyncHandler(async (req, res) => {
  try {
    // 1. VERIFY PAYSTACK SIGNATURE
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      logger.warn("Invalid Paystack webhook signature");
      return res.sendStatus(401);
    }

    logger.info("Paystack signature verified");
    const event = req.body;

    logger.info("📩 Webhook received", {
      event: event.event,
    });

    // ===============================
    // 2. HANDLE SUCCESSFUL PAYMENT
    // ===============================
    if (event.event === "charge.success") {
      try {
        const email = event.data.customer.email;
        const reference = event.data.reference;
        const eventId = event.data.metadata?.eventID;

        // IDEMPOTENCY CHECK
        const existingTicket = await Ticket.findOne({
          reference,
        });

        if (existingTicket) {
          logger.warn("Duplicate webhook ignored", {
            reference,
          });

          return res.sendStatus(200);
        }

        logger.info("Payment metadata received", {
          metadata: event.data.metadata,
        });
        if (!eventId) {
          logger.warn("❌ No event ID found in Paystack metadata");
          return;
        }

        const eventData = await eventModel.findById(eventId);

        if (!eventData) {
          logger.warn("Event not found during webhook processing", {
            eventId,
          });
          return;
        }

        logger.info("Event found", {
          eventName: eventData.name,
          eventId,
        });
        logger.info("Event found", {
          eventName: eventData.name,
          eventId,
        });
        // ===============================
        // 3. GENERATE TICKET ID
        // ===============================
        const ticketId = String(Math.floor(100000 + Math.random() * 900000));

        // ===============================
        // 4. SAVE TICKET TO DATABASE
        // ===============================
        const ticket = await Ticket.create({
          email,
          eventName: eventData.name,
          eventId: eventData._id,
          ticketId,
          reference,
          paidAt: new Date(),
        });

        logger.info("Ticket created successfully", {
          ticketId,
          email,
          eventName: eventData.name,
        });
        // ===============================
        // 5. GENERATE QR CODE
        // ===============================
        const qrData = `https://your-app-name.onrender.com/api/tickets/verify/${ticketId}`;
        const qrImage = await generateQR(qrData);

        if (!qrImage) {
          logger.error("QR code generation failed");
          return res.sendStatus(500);
        }

        logger.info("QR code generated");
        // ===============================
        // 6. PREPARE EMAIL
        // ===============================
        const html = ticketTemplate({
          eventName: eventData.name,
          ticketId,
          reference,
          date: eventData.date,
          location: eventData.location,
          qrImage,
        });

        // ===============================
        // 7. SEND EMAIL WITH QR
        // ===============================

        await sendEmail(email, "Your Ticket 🎟️", html, qrImage);
        logger.info("Ticket email sent successfully", {
          email,
          ticketId,
        });
      } catch (err) {
        if (err.code === 11000) {
          logger.warn("Duplicate payment reference", {
            reference: err.keyValue.reference,
          });

          return res.sendStatus(200);
        }
        logger.error("Webhook inner processing failed", {
          message: err.message,
          stack: err.stack,
        });
      }
    }

    // ===============================
    // 8. RESPOND TO PAYSTACK
    // ===============================
    res.sendStatus(200);
  } catch (error) {
    logger.error("Webhook processing failed", {
      message: error.message,
      stack: error.stack,
    });
    res.sendStatus(500);
  }
});
