const routes = require("express").Router();

const scriptController = require("../controller/script.controller");

routes.route("/test").post(scriptController.scripthandle);

routes.route("/orders").post(scriptController.getOrders);

routes
  .route("/pagination")
  .post(scriptController.addData)
  .delete(scriptController.deleteData);
routes.route("/pagination/items").get(scriptController.getDummyData);
routes.route("/itemsQuantity").get(scriptController.fetchDataQuantity);

module.exports = routes;
