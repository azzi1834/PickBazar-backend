const routes = require("express").Router();

const scriptController = require("../controller/script.controller");

routes.route("/test").post(scriptController.scripthandle);

module.exports = routes;
