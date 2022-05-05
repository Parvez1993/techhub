import express from "express";
import {
  addOrderItems,
  getOrderbyItems,
  getUserOrders,
  updateOrderToPaid,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(addOrderItems);
orderRouter.route("/myorders").get(getUserOrders);
orderRouter.route("/:id").get(getOrderbyItems);
orderRouter.route("/:id/pay").put(updateOrderToPaid);

export default orderRouter;
