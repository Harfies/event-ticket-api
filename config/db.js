const mongoose = require("mongoose");

const dns = require("node:dns");

// Configure DNS before loading Mongoose.
dns.setServers(["1.1.1.1", "1.0.0.1"]);

// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ");
  } catch (error) {
    console.log("DB error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
