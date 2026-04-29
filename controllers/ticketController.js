const Ticket = require("../models/ticketModel");

//verify ticket
exports.verifyTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    //console.log("PARAMS:", req.params);

    // 🔍 ADD DEBUG HERE
    //const allTickets = await Ticket.find();
    //console.log("ALL TICKETS:", allTickets);

    const ticket = await Ticket.findOne({
      ticketId: String(ticketId),
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "❌ Invalid ticket",
      });
    }

    if (ticket.isUsed) {
      return res.status(400).json({
        success: false,
        message: "⚠️ Ticket already used",
      });
    }

    ticket.isUsed = true;
    await ticket.save();

    res.json({
      success: true,
      message: "✅ Ticket valid",
      data: ticket,
    });
  } catch (error) {
    console.log("❌ Verify error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
