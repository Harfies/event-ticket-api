const Event = require("../models/eventModel");
const { createEventSchema } = require("../validators/eventValidator");

/*
// ✅ GET ALL EVENTS
exports.getAllEvents = async (req, res) => {
  try {
    // get query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // fetch events
    const events = await Event.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // total count
    const total = await Event.countDocuments();

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
      data: events,
    });
  } catch (error) {
    console.log("Get events error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ✅ GET EVENT BY NAME
exports.getEventByName = async (req, res) => {
  try {
    const { name } = req.params || req.query.name;

    // ✅ pagination starts here
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // ✅ query with pagination
    const events = await Event.find({
      name: { $regex: `^${name.trim()}`, $options: "i" },
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Event.countDocuments({
      name: { $regex: name, $options: "i" },
    });

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No event found",
      });
    }

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      data: events,
    });
  } catch (error) {
    console.log("Search error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
*/

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
