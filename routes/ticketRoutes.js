const express = require("express");
const router = express.Router();

const { verifyTicket } = require("../controllers/ticketController");

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
// EXPORT ROUTER
// ===============================
module.exports = router;
