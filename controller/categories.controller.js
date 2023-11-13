const Categories = require("../models/category.model");
const Subcategories = require("../models/subcategory.model");
const Admin = require("../models/admin.model");

const createCategory = async (req, res) => {
  try {
    let admin_id = req?.user?.id;

    const isAlreadyCategory = await Categories.findOne({ name: req.body.name });

    if (admin_id) {
      const categoryData = {
        ...req.body,
        adminId: admin_id,
      };

      if (!isAlreadyCategory) {
        const insertObj = new Categories(categoryData);

        const dbResponse = await insertObj.save();

        return res.status(200).json(dbResponse);
      } else {
        return res.status(409).json("Category Already Exists");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const createSubcategory = async (req, res) => {
  try {
    const admin_id = req?.user.id;

    const category = await Categories.findById({ _id: req.body.category_id });

    const isAlreadySubcategory = await Subcategories.findOne({
      name: req.body.name,
    });

    if (category && admin_id && !isAlreadySubcategory) {
      const subcategoryData = {
        ...req.body,
        adminId: admin_id,
        categoryId: category._id,
      };

      const subcategory = new Subcategories(subcategoryData);

      const dbResponse = await subcategory.save();

      return res.status(200).json(dbResponse);
    } else {
      return res.status(404).json("error");
    }
  } catch (error) {
    debugger;

    console.log(error);
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createCategory,
  createSubcategory,
};
