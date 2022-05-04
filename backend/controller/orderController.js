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

const updateOrderToPaid = async (req, res) => {
  console.log("aaaaaaa");
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    console.log(updateOrder);
    res.json(updateOrder);
  } else {
    res.status(400);
    throw new NotFoundError("No order items");
  }
};
export { addOrderItems, getOrderbyItems, updateOrderToPaid };
