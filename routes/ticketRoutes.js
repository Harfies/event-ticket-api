const express = require("express");
const router = express.Router();

const { verifyTicket } = require("../controllers/ticketController");

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket verification endpoints
 */

/**
 * @swagger
 * /api/tickets/verify/{ticketId}:
 *   get:
 *     summary: Verify a ticket
 *     tags: [Tickets]
 *
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *
 *     responses:
 *       200:
 *         description: Ticket valid
 *
 *       400:
 *         description: Ticket already used
 *
 *       404:
 *         description: Invalid ticket
 */

router.get("/verify/:ticketId", verifyTicket);

module.exports = router;
