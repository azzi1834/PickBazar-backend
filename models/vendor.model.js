const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "vendor",
  },
});

module.exports = mongoose.model("Vendor", vendorSchema, "Vendor");
