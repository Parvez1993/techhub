import NotFoundError from "../errors/not-found.js";
import Order from "../models/Order.js";

const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new NotFoundError("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user.userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

const getOrderbyItems = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new NotFoundError("No order items");
  }
};

export { addOrderItems, getOrderbyItems };
