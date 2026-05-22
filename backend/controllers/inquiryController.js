const Inquiry = require("../models/Inquiry");

// Create Inquiry
const createInquiry = async (req, res) => {

  try {

    const {
      vendorId,
      customerName,
      customerPhone,
      requirement,
      budget,
    } = req.body;

    const newInquiry = new Inquiry({
      vendorId,
      customerName,
      customerPhone,
      requirement,
      budget,
    });

    await newInquiry.save();

    res.status(201).json({
      message: "Inquiry Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Get Vendor Inquiries
const getVendorInquiries = async (req, res) => {

  try {

    const inquiries = await Inquiry.find({
      vendorId: req.params.vendorId,
    });

    res.status(200).json(inquiries);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Unlock Lead
const unlockLead = async (req, res) => {

  try {

    const inquiry = await Inquiry.findByIdAndUpdate(

      req.params.id,

      {
        isUnlocked: true,
      },

      { new: true }

    );

    res.status(200).json({
      message: "Lead Unlocked",
      inquiry,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  createInquiry,
  getVendorInquiries,
  unlockLead,
};