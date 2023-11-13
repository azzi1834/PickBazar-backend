const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  accountHolderEmail: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNo: {
    type: Number,
  },
  country: {
    type: String,
  },
  street: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  shopStatus: {
    type: String,
    default: "Inactive",
  },
});

module.exports = mongoose.model("Shop", ShopSchema, "Shop");
