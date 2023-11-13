const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategories",
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  name: {
    type: String,
  },
  unit: {
    type: Number,
  },
  description: {
    type: String,
  },
  publishStatus: {
    type: String,
    default: "Draft",
  },
  productType: {
    type: String,
    default: "Simple",
  },
  price: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Products", ProductSchema, "Products");
