const Product = require("../models/product.model");
const Vendor = require("../models/vendor.model");
const Categories = require("../models/category.model");
const Subcategories = require("../models/subcategory.model");

const createProduct = async (req, res) => {
  try {
    debugger;
    const vendor_id = req?.user?.id;

    const category = await Categories.findById({ _id: req.body.category_id });

    const subcategory = await Subcategories.findById({
      _id: req.body.subcategory_id,
    });

    const isAlreadyProduct = await Product.findOne({ name: req.body.name });

    if (vendor_id && category && subcategory && !isAlreadyProduct) {
      const productData = {
        ...req.body,
        vendorId: vendor_id,
        categoryId: req.body.category_id,
        subcategoryId: req.body.subcategory_id,
        shopId: req.body.shopId,
      };

      const product = new Product(productData);

      const dbResponse = await product.save();

      return res.status(200).json(dbResponse);
    } else {
      return res.status(404).json("Not found");
    }
  } catch (error) {
    debugger;
    console.log(error);
    return res.status(404).json(error.message);
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
};

module.exports = {
  createProduct,
  getAllProducts,
};
