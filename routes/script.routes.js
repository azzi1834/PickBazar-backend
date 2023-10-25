const routes = require("express").Router();

const scriptController = require("../controller/script.controller");

routes.route("/test").post(scriptController.scripthandle);
routes.route("/orders").post(scriptController.getOrders);

module.exports = routes;
