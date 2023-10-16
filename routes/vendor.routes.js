const routes = require("express").Router();
const authController = require("../controller/auth.controller");

routes.route("/register").post(authController.registerVendor); //comment add

routes.route("/login").post(authController.loginVendor);

module.exports = routes;
