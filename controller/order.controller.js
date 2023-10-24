const Customer = require("../models/customer.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { generateUniqueTrackingNumber } = require("../utils");

const addOrder = async (req, res) => {
  try {
    const customer_id = req?.user?.id;

    const product = await Product.findById({ _id: req.body.product_id });

    if (customer_id && product) {
      const orderData = {
        ...req.body,
        customerId: customer_id,
        productId: req.body.product_id,
      };

      const insertCategory = new Order(orderData);

      const dbResponse = await insertCategory.save();

      return res.status(200).json(dbResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate("customerId");

  console.log("Orders :::", orders);

  return res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;

  const status = req.body.status;

  const findOrder = Order.findByIdAndUpdate(orderId, { OrderStatus: "status" });

  if (findOrder) {
    console.log(findOrder);
    return res.status(200).json("Order Status Updated");
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  updateOrderStatus,
};
