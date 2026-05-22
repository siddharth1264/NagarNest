const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({

  businessName: {
    type: String,
    required: true,
  },

  ownerName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "",
  },

  experience: {
    type: String,
    default: "",
  },

  serviceArea: {
    type: String,
    default: "",
  },

  priceRange: {
    type: String,
    default: "",
  },

  services: {
    type: [String],
    default: [],
  },

  portfolioImages: {
    type: [String],
    default: [],
  },

});

module.exports = mongoose.model("Vendor", vendorSchema);