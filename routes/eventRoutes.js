const express = require("express");
const router = express.Router();

const { getEvents, createEvent } = require("../controllers/eventController");

const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/eventValidator");

// GET all events
router.get("/", getEvents);
// CREATE event
router.post("/", validate(createEventSchema), createEvent);

// export router
module.exports = router;
