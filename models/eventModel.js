// fake database (array)
const events = [
  { id: 1, name: "Tech Conference 2026", price: 10000 },
  { id: 2, name: "Music Festival", price: 5000 },
];

// get all events
const getAllEvents = () => events;

// get one event
const getEventById = (id) => {
  return events.find((event) => event.id == id);
};

module.exports = {
  getAllEvents,
  getEventById,
};
