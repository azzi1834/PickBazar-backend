const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    contactNumber: {
      type: Number,
    },
    BillingAddress: {
      type: String,
    },
    ShippingAddress: {
      type: String,
    },
    DeliverySchedule: {
      type: String,
    },
    OrderNote: {
      type: String,
    },
    ShippingCharge: {
      type: Number,
    },
    Discount: {
      type: Number,
      default: 0,
    },
    Tax: {
      type: Number,
    },
    Total: {
      type: Number,
    },

    OrderStatus: {
      type: String,
      default: "Pending",
    },
    PaymentStatus: {
      type: String,
      default: "Pending",
    },
    OrderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrderSchema, "Orders");
