const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },

  customerName: {
    type: String,
    required: true,
  },

  customerPhone: {
    type: String,
    required: true,
  },

  requirement: {
    type: String,
    required: true,
  },

  budget: {
    type: String,
  },

  // Lead Unlock Status
  isUnlocked: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Inquiry",
  inquirySchema
);