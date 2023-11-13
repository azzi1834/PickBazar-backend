const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Categories", CategoriesSchema, "Categories");
