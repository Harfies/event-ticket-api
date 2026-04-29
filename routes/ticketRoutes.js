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
