const bcrypt = require("bcrypt");

const Customer = require("../models/customer.model");
const Admin = require("../models/admin.model");
const Vendor = require("../models/vendor.model");
const jwtToken = require("../utils");

const registerCustomer = async (req, res) => {
  try {
    const isAlreadyUser = await Customer.findOne({ email: req.body.email });
    if (isAlreadyUser) {
      return res.json("User already exists");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const customer = await Customer.create(req.body);
    const customerToken = jwtToken({
      id: customer._id,
      email: customer.email,
    });
    return res.status(200).json({ ...customer, Token: customerToken });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const registerAdmin = async (req, res) => {
  try {
    const isAlreadyAdmin = await Admin.findOne({ email: req.body.email });
    if (isAlreadyAdmin) {
      return res.json("Admin already exists");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const admin = await Admin.create(req.body);
    const adminToken = jwtToken({
      id: admin._id,
      email: admin.email,
    });
    return res.status(200).json({ ...admin, "Admin Token": adminToken });
  } catch (error) {
    console.log(error);
  }
};

const registerVendor = async (req, res) => {
  try {
    const isAlreadyVendor = await Vendor.findOne({ email: req.body.email });
    if (isAlreadyVendor) {
      return res.json("Vendor already exists");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const vendor = await Vendor.create(req.body);
    const vendorToken = jwtToken({
      id: vendor._id,
      email: vendor.email,
    });
    return res.status(200).json({ ...vendor, "Vendor Token": vendorToken });
  } catch (error) {
    console.log(error);
  }
};

const loginCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(401).status("Customer does not exist");
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      customer.password
    );
    if (matchPassword) {
      const token = jwtToken({ id: customer._id, email: customer.email });
      return res.json({ ...customer, token });
    } else {
      return res.status(401).json("Invalid Password");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin === null) {
      return res.status(401).status("Admin does not exist");
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (matchPassword) {
      const token = jwtToken({ id: admin._id, email: admin.email });
      return res.json({ ...admin, token });
    } else {
      return res.status(401).json("Invalid Password");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const loginVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.body.email });
    console.log(vendor);
    if (vendor === null) {
      return res.status(401).status("Vendor does not exist");
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      vendor.password
    );
    if (matchPassword) {
      const token = jwtToken({ id: vendor._id, email: vendor.email });
      return res.json({ ...vendor, token });
    } else {
      return res.status(401).json("Invalid Password");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  registerCustomer,
  registerAdmin,
  registerVendor,
  loginCustomer,
  loginAdmin,
  loginVendor,
};
