const mongoose = require("mongoose");

let adminSchemaObj = {
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
};

const adminSchema = new mongoose.Schema(adminSchemaObj);

module.exports = mongoose.model("Admin", adminSchema, "Admin");
