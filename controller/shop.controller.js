const Shop = require("../models/shop.model");

const Vendor = require("../models/vendor.model");

const createShop = async (req, res) => {
  try {
    const vendor_id = req?.user?.id;

    if (vendor_id) {
      const shopData = {
        ...req.body,
        vendorId: vendor_id,
      };

      const shop = new Shop(shopData);

      const response = await shop.save();

      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createShop,
};
