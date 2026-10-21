const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
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
 * /api/v1/events:
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
 *             required:
 *               - name
 *               - price
 *               - location
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Event"
 *               description:
 *                 type: string
 *                 example: "A tech event for developers"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2027-12-25"
 *                 description: "Use YYYY-MM-DD. The date must be today or in the future."
 *               location:
 *                 type: string
 *                 example: "Ikeja, Lagos"
 *                 description: "Enter the city and location."
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 10000
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid event details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

// CREATE event
router.post("/", protect, adminOnly, validate(createEventSchema), createEvent);

/**
 * @swagger
 * /api/v1/events:
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
 * /api/v1/events/{id}:
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
router.put("/:id", protect, adminOnly, updateEvent);

/**
 * @swagger
 * /api/v1/events/{id}:
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
router.delete("/:id", protect, adminOnly, deleteEvent);

// export router
module.exports = router;
