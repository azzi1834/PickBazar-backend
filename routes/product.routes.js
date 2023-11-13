const routes = require("express").Router();

const productController = require("../controller/product.controller");

routes
  .route("/product")
  .post(productController.createProduct)
  .get(productController.getAllProducts);
// routes.route("/cart").post(productController.addItem);

module.exports = routes;
