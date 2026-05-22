const express = require("express");

const router = express.Router();

const {
  createInquiry,
  getVendorInquiries,
  unlockLead,
} = require("../controllers/inquiryController");

// Create Inquiry
router.post(
  "/create",
  createInquiry
);

// Get Vendor Inquiries
router.get(
  "/vendor/:vendorId",
  getVendorInquiries
);

// Unlock Lead
router.put(
  "/unlock/:id",
  unlockLead
);

module.exports = router;