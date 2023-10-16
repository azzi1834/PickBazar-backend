const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtToken = (body) => {
  try {
    return jwt.sign(body, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return error;
  }
};

module.exports = jwtToken;
