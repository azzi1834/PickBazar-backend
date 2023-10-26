const routes = require("express").Router();

const shopController = require("../controller/shop.controller");

routes.route("/createShop").post(shopController.createShop);
routes.route("/shop-orders").get(shopController.getOrders);

module.exports = routes;
