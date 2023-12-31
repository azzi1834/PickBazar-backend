const routes = require("express").Router();

const orderController = require("../controller/order.controller");

routes.route("/newOrder").post(orderController.addOrder);
routes.route("/allOrders").get(orderController.getAllOrders);
routes
  .route("/order/update/orderStatus/:id")
  .put(orderController.updateOrderStatus);
routes.route("/customerOrders").get(orderController.customerOrders);
module.exports = routes;
