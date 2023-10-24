const routes = require("express").Router();

const productController = require("../controller/product.controller");

routes.route("/product").post(productController.createProduct);

module.exports = routes;
