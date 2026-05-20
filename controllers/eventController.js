const Event = require("../models/eventModel");
const asyncHandler = require("../middleware/asyncHandler");
const { createEventSchema } = require("../validators/eventValidator");

exports.getEvents = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    // 🔍 Build filter
    let query = {};

    if (name && name.trim() !== "") {
      query.name = {
        $regex: `^${name.trim()}`,
        $options: "i",
      };
    }

    // 📄 Convert to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // 📊 Fetch data
    const events = await Event.find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // newest first

    // 📈 Total count
    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalResults: total,
      results: events.length,
      data: events,
    });
  } catch (error) {
    console.log("Pagination error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// CREATE EVENT
exports.createEvent = async (req, res) => {
  const { error } = createEventSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const { name, date, location, price, description } = req.body;

    const event = await Event.create({
      name,
      date,
      location,
      price,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log("Create event error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE EVENT
exports.updateEvent = asyncHandler(async (req, res) => {
  const event = await eventModel.findById(req.params.id);

  // CHECK EVENT
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  // UPDATE EVENT
  const updatedEvent = await eventModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    event: updatedEvent,
  });
});

// DELETE EVENT
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await eventModel.findById(req.params.id);

  // CHECK EVENT
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  // DELETE EVENT
  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});
