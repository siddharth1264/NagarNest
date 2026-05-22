const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const inquiryRoutes = require("./routes/inquiryRoutes");
require("dotenv").config();

// Import Routes
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Vendor Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("NagarNest API Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});