const routes = require("express").Router();

const shopController = require("../controller/shop.controller");

routes.route("/createShop").post(shopController.createShop);

module.exports = routes;
