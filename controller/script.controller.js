const Product = require("../models/product.model");
const Vendor = require("../models/vendor.model");
const Categories = require("../models/category.model");
const Subcategories = require("../models/subcategory.model");
const Customer = require("../models/customer.model");
const Admin = require("../models/admin.model");

const jwtToken = require("../utils");

const authContoller = require("../controller/auth.controller");

const bcrypt = require("bcrypt");

const scripthandle = async (req, res) => {
  console.log(req.body);

  //Admin SignUp
  const adminName = req.body.admin.info.fullName;

  const adminEmail = req.body.admin.info.email;

  const adminPassword = req.body.admin.info.password;

  const adminHashedPassword = bcrypt.hashSync(adminPassword, 10);

  const isAlreadyUser = await Customer.findOne({ email: req.body.email });

  if (isAlreadyUser) {
    return res.json("User already exists");
  }

  const admin = await Admin.create({
    fullName: adminName,
    email: adminEmail,
    password: adminHashedPassword,
  });

  const adminToken = jwtToken({
    id: admin._id,
    email: admin.email,
  });

  //Admin Create Categories

  res.status(200).json({ admin, adminToken });
};
module.exports = {
  scripthandle,
};
