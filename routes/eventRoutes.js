const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/eventValidator");

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized
 */

// CREATE event
router.post("/", protect, validate(createEventSchema), createEvent);

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

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

// UPDATE EVENT
router.put("/:id", protect, updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
// DELETE EVENT
router.delete("/:id", protect, deleteEvent);

// export router
module.exports = router;
