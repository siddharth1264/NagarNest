const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Vendor
const registerVendor = async (req, res) => {

  try {

    const {
      businessName,
      ownerName,
      email,
      phone,
      password,
    } = req.body;

    // Check Existing Vendor
    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {

      return res.status(400).json({
        message: "Vendor already exists",
      });

    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create Vendor
    const newVendor = new Vendor({
      businessName,
      ownerName,
      email,
      phone,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({
      message: "Vendor registered successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Login Vendor
const loginVendor = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check Vendor
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {

      return res.status(400).json({
        message: "Vendor not found",
      });

    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      vendor.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    // Create JWT Token
    const token = jwt.sign(
      {
        id: vendor._id,
      },
      "nagarnestsecret",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      vendor,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Update Vendor Profile
const updateVendorProfile = async (req, res) => {

  try {

    const vendor = await Vendor.findByIdAndUpdate(

      req.params.id,

      {
        category: req.body.category,
        experience: req.body.experience,
        serviceArea: req.body.serviceArea,
        priceRange: req.body.priceRange,
        services: req.body.services,

        portfolioImages: req.files
          ? req.files.map(
              (file) => file.filename
            )
          : [],
      },

      { new: true }

    );

    res.status(200).json({
      message: "Profile Updated Successfully",
      vendor,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Get All Vendors
const getAllVendors = async (req, res) => {

  try {

    const vendors = await Vendor.find();

    res.status(200).json(vendors);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Get Single Vendor
const getSingleVendor = async (req, res) => {

  try {

    const vendor = await Vendor.findById(
      req.params.id
    );

    if (!vendor) {

      return res.status(404).json({
        message: "Vendor Not Found",
      });

    }

    res.status(200).json(vendor);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  registerVendor,
  loginVendor,
  updateVendorProfile,
  getAllVendors,
  getSingleVendor,
};