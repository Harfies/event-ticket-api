/**
 * @swagger
 * /api/tickets/verify/{ticketId}:
 *   get:
 *     summary: Verify a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket valid
 *       400:
 *         description: Ticket already used
 *       404:
 *         description: Invalid ticket
 */
const express = require("express");
const router = express.Router();

//const ticketController = require("../controllers/ticketController");
const {
  verifyTicket,
  ticketController,
} = require("../controllers/ticketController");

// verify ticket route
router.get("/verify/:ticketId", verifyTicket);

// GET /api/ticket?email=...
//router.get("/", ticketController.getUserTickets);

module.exports = router;
