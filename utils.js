const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtToken = (body) => {
  try {
    return jwt.sign(body, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return error;
  }
};

// export function generateUniqueTrackingNumber (prefix = "", length = 10){
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let trackingNumber = prefix;

//   for (let i = prefix.length; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     trackingNumber += characters[randomIndex];
//   }

//   return trackingNumber;
// };
module.exports = jwtToken;
