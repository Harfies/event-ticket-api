const express = require("express");
const router = express.Router();

const { getEvents, createEvent } = require("../controllers/eventController");

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
 *               - date
 *               - location
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Conference 2026
 *               description:
 *                 type: string
 *                 example: A global technology conference
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-20
 *               location:
 *                 type: string
 *  *                 example: Lagos
 *               price:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */

const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/eventValidator");

// GET all events
router.get("/", getEvents);
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
// export router
module.exports = router;
