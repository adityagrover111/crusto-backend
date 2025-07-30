const Order = require("../models/order.model");
const { v4: uuidv4 } = require("uuid");

function calculateEstimatedDeliveryTime(createdAt, priority) {
  const estimated = new Date(createdAt);
  estimated.setMinutes(estimated.getMinutes() + (priority ? 20 : 30));
  return estimated;
}

function calculateStatus(createdAt, priority) {
  const now = new Date();
  const elapsedMinutes = (now - new Date(createdAt)) / (1000 * 60);
  if (elapsedMinutes >= (priority ? 20 : 30)) return "order delivered";
  if (elapsedMinutes >= (priority ? 10 : 20)) return "out for delivery";
  return "preparing order";
}

exports.createOrder = async (req, res) => {
  try {
    const { customer, phone, address, cart, priority } = req.body;

    if (!customer || !phone || !address || !cart || cart.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing required order fields." });
    }

    const createdAt = new Date();
    const estimatedDelivery = calculateEstimatedDeliveryTime(
      createdAt,
      priority
    );
    const status = calculateStatus(createdAt, priority);
    const id = uuidv4().slice(0, 7).toUpperCase();

    const orderPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const priorityPrice = 0;

    const newOrder = new Order({
      id,
      customer,
      phone,
      address,
      cart,
      priority,
      status,
      createdAt,
      estimatedDelivery,
      orderPrice,
      priorityPrice,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation failed:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedStatus = calculateStatus(order.createdAt, order.priority);
    const updatedEstimatedDelivery = calculateEstimatedDeliveryTime(
      order.createdAt,
      order.priority
    );

    res.status(200).json({
      ...order.toObject(),
      status: updatedStatus,
      estimatedDelivery: updatedEstimatedDelivery,
    });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
