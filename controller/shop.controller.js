const Shop = require("../models/shop.model");

const Order = require("../models/order.model");

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

//Get all orders of particular shop
const getOrders = async (req, res) => {
  const shopId = "6538c6bf33170bd4501ca4c5";
  const orders = await Order.find({
    productId: {
      $in: (
        await Product.find({ shopId: shopId })
      ).map((product) => product._id),
    },
  }).populate("productId");
  res.status(200).json(orders);
};

module.exports = {
  createShop,
  getOrders,
};
