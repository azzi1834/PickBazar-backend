const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
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
    address: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Customers", customerSchema);
