import express from "express";
import {
  addOrderItems,
  getOrderbyItems,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(addOrderItems);
orderRouter.route("/getorders").get(getOrders);
orderRouter.route("/myorders").get(getUserOrders);
orderRouter.route("/:id").get(getOrderbyItems);
orderRouter.route("/:id/pay").put(updateOrderToPaid);
orderRouter.route("/:id/deliver").put(updateOrderToDelivered);

export default orderRouter;
