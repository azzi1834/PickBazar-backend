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
  const orders = await Order.find({
    customerId: "6538c6bf33170bd4501ca4cb",
  }).populate("customerId");

  return res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;

  const status = req.body.status;

  const findOrder = Order.findByIdAndUpdate(orderId, { OrderStatus: "status" });

  if (findOrder) {
    return res.status(200).json("Order Status Updated");
  }
};

const customerOrders = async (req, res) => {
  const customer_id = req?.user?.id;

  const customerOrders = await Order.find({
    customerId: "6538c6bf33170bd4501ca4cb",
  }).sort({ OrderDate: -1 });
  const product = await Product.find({
    productId: customerOrders.productId,
  });
  console.log(product);

  return res.status(200).json({ customer_id, customerOrders, product });
};

module.exports = {
  addOrder,
  getAllOrders,
  updateOrderStatus,
  customerOrders,
};
