const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
  bio: {
    type: String,
  },
  notificationEmail: {
    type: String,
  },
  enableNotification: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("Admins", adminSchema);
