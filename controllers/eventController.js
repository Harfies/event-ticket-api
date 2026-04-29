const eventModel = require("../models/eventModel");

// return all events
exports.getEvents = (req, res) => {
  const events = eventModel.getAllEvents();
  res.json(events);
};
