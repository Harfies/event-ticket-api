const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

// GET all events
router.get("/", eventController.getEvents);

// export router
module.exports = router;
