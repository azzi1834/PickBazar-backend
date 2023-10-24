const routes = require("express").Router();

const categoryController = require("../controller/categories.controller");

routes.route("/category").post(categoryController.createCategory);
routes.route("/sub-category").post(categoryController.createSubcategory);

module.exports = routes;
