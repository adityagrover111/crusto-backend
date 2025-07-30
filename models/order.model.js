const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: String,
  customer: String,
  phone: String,
  address: String,
  cart: Array,
  priority: Boolean,
  status: String,
  createdAt: Date,
  estimatedDelivery: Date,
  orderPrice: Number,
  priorityPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
