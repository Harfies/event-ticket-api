/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events or search by name
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Event name to search
 *     responses:
 *       200:
 *         description: List of events
 */

const express = require("express");
const router = express.Router();

const { getEvents, createEvent } = require("../controllers/eventController");

const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/eventValidator");

// GET all events
router.get("/", getEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 */

// CREATE event
router.post("/", validate(createEventSchema), createEvent);

// export router
module.exports = router;
