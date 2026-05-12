const express = require("express");
const router = express.Router();

const {
  verifyTicket,
  getUserTickets,
} = require("../controllers/ticketController");

// ===============================
// SWAGGER TAG
// ===============================

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management and verification endpoints
 */

// ===============================
// VERIFY TICKET
// ===============================

/**
 * @swagger
 * /api/tickets/verify/{ticketId}:
 *   get:
 *     summary: Verify a ticket
 *     description: Verifies whether a ticket is valid, already used, or invalid.
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket ID
 *         example: 123456
 *     responses:
 *       200:
 *         description: Ticket verified successfully
 *       400:
 *         description: Ticket already used
 *       404:
 *         description: Invalid ticket
 *       500:
 *         description: Server error
 */
router.get("/verify/:ticketId", verifyTicket);

// ===============================
// GET USER TICKETS
// ===============================

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get tickets by email
 *     description: Fetch all tickets associated with a user email.
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: user@gmail.com
 *     responses:
 *       200:
 *         description: Tickets fetched successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Server error
 */
//router.get("/", getUserTickets);

// ===============================
// EXPORT ROUTER
// ===============================
module.exports = router;
