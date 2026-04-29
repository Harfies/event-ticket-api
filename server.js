require("dotenv").config();
const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();

// connect to DB
const connectDB = require("./config/db");
connectDB();

// middleware to read JSON body
app.use(express.json());

// routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/tickets", ticketRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
