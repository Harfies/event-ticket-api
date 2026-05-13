const express = require("express");
const router = express.Router();

const { getEvents, createEvent } = require("../controllers/eventController");

const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/eventValidator");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

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
 *               - description
 *               - location
 *               - date
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */

// CREATE event
router.post("/", validate(createEventSchema), createEvent);

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
 *         description: Search event by name
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of events per page
 *
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */

// GET all events
router.get("/", getEvents);

// export router
module.exports = router;
