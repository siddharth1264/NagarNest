const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  registerVendor,
  loginVendor,
  updateVendorProfile,
  getAllVendors,
  getSingleVendor,
} = require("../controllers/vendorController");

// Register Vendor
router.post("/register", registerVendor);

// Login Vendor
router.post("/login", loginVendor);

// Get All Vendors
router.get("/all-vendors", getAllVendors);

// Get Single Vendor
router.get(
  "/single-vendor/:id",
  getSingleVendor
);

// Update Vendor Profile
router.put(
  "/update-profile/:id",
  upload.array("portfolioImages", 10),
  updateVendorProfile
);

module.exports = router;