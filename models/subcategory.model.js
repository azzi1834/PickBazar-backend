const mongoose = require("mongoose");

const SubcategoriesSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Subcategories",
  SubcategoriesSchema,
  "Subcategories"
);
