const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    email: String,
    eventName: String,
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },

    paidAt: Date,

    //  prevent duplicate tickets for the same email and event
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ticket", ticketSchema);
