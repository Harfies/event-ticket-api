const axios = require("axios");
const eventModel = require("../models/eventModel");
const sendEmail = require("../utils/sendEmail");
const Ticket = require("../models/ticketModel");
const crypto = require("crypto");
const generateQR = require("../utils/generateQR");
const ticketTemplate = require("../utils/emailTemplate");

// initialize payment
exports.initializePayment = async (req, res) => {
  const { email, eventId } = req.body;

  const event = eventModel.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: event.price * 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Payment failed" });
  }
};

// verify payment
/*exports.verifyPayment = async (req, res) => {
  const { reference, email, eventId } = req.body;

  // get event from model
  const event = eventModel.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  try {
    // verify transaction from Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      },
    );

    // check if payment successful
    if (response.data.data.status === "success") {
      // generate ticket ID
      const ticketId = Math.floor(Math.random() * 1000000);

      // send email
      await sendEmail(
        email,
        "Your Ticket 🎟️",
        `Event: ${event.name}\nTicket ID: ${ticketId}`,
      );

      return res.json({
        message: "Payment verified & ticket sent",
      });
    }

    res.status(400).json({ message: "Payment not successful" });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "Verification failed" });
  }
};*/

//webhook handler
/*exports.handleWebhook = async (req, res) => {
  console.log("🔥 Webhook received");

  try {
    const event = req.body;

    console.log("👉 Event type:", event.event);

    if (event.event === "charge.success") {
      console.log("✅ Charge success confirmed");

      const email = event.data.customer.email;
      console.log("📧 Email:", email);

      console.log("📦 Raw metadata:", event.data.metadata);

      // SAFE metadata handling
      let eventName = "Event";

      try {
        if (event.data.metadata) {
          const parsed =
            typeof event.data.metadata === "string"
              ? JSON.parse(event.data.metadata)
              : event.data.metadata;

          eventName = parsed.eventName || "Event";
        }
      } catch (err) {
        console.log("⚠️ Metadata parse error:", err.message);
      }

      console.log("🎟️ Event name:", eventName);

      const ticketId = Math.floor(Math.random() * 1000000);
      console.log("🎫 Ticket ID:", ticketId);

      // Save ticket to DB
      await Ticket.create({
        email,
        eventName,
        ticketId,
        reference: event.data.reference,
        paidAt: new Date(),
      });
      console.log("🚀 About to send email...");

      await sendEmail(
        email,
        "Your Ticket 🎟️",
        `Event: ${eventName}\nTicket ID: ${ticketId}`,
      );

      console.log("✅ Email function executed");
    } else {
      console.log("❌ Not charge.success");
    }
  } catch (error) {
    console.log("🔥 Webhook error:", error.message);
  }

  res.sendStatus(200);
};*/

// SECURE WEBHOOK

exports.handleWebhook = async (req, res) => {
  try {
    // ===============================
    // 1. VERIFY PAYSTACK SIGNATURE
    // ===============================
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      console.log("❌ Invalid signature");
      return res.sendStatus(401);
    }

    console.log("✅ Paystack signature verified");

    const event = req.body;

    console.log("📩 Webhook received:", event.event);

    // ===============================
    // 2. HANDLE SUCCESSFUL PAYMENT
    // ===============================
    if (event.event === "charge.success") {
      try {
        const email = event.data.customer.email;
        const reference = event.data.reference;

        console.log("💰 Payment successful for:", email);

        // ===============================
        // 3. GENERATE TICKET ID
        // ===============================
        const ticketId = String(Math.floor(100000 + Math.random() * 900000));

        // ===============================
        // 4. SAVE TICKET TO DATABASE
        // ===============================
        const ticket = await Ticket.create({
          email,
          eventName: "Event",
          ticketId,
          reference,
          paidAt: new Date(),
        });

        console.log("🎟️ Ticket saved:", ticket);

        // ===============================
        // 5. GENERATE QR CODE
        // ===============================
        const qrData = `https://your-app-name.onrender.com/api/tickets/verify/${ticketId}`;
        const qrImage = await generateQR(qrData);

        if (!qrImage) {
          console.log("❌ QR generation failed");
          return res.sendStatus(500);
        }

        console.log("🔳 QR generated");

        // ===============================
        // 6. PREPARE EMAIL
        // ===============================
        const html = ticketTemplate({
          eventName: "Event",
          ticketId,
          reference,
          date: "25th May 2026",
          location: "Lagos, Nigeria",
        });

        // ===============================
        // 7. SEND EMAIL WITH QR
        // ===============================
        await sendEmail(email, "Your Ticket 🎟️", html, qrImage);

        console.log("📧 Ticket email sent");
      } catch (err) {
        console.log("❌ Webhook inner error:", err.message);
      }
    }

    // ===============================
    // 8. RESPOND TO PAYSTACK
    // ===============================
    res.sendStatus(200);
  } catch (error) {
    console.log("❌ Webhook error:", error.message);
    res.sendStatus(500);
  }
};
