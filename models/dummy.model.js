const mongoose = require("mongoose");

const dummyDataObj = {
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
};

const dummySchema = new mongoose.Schema(dummyDataObj);

module.exports = mongoose.model("Dummy", dummySchema, "Dummy");
