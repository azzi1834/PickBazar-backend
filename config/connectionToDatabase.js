const mongoose = require("mongoose");
require("dotenv").config();
async function connectionToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectionToDatabase;
