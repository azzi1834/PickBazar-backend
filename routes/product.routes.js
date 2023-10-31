const routes = require("express").Router();

const productController = require("../controller/product.controller");

routes.route("/product").post(productController.createProduct).get(productController.getAllProducts);

module.exports = routes;
