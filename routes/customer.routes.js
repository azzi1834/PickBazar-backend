const routes = require("express").Router();

const authController = require("../controller/auth.controller");

routes.route("/register").post(authController.registerCustomer);
routes.route("/login").post(authController.loginCustomer);

module.exports = routes;
