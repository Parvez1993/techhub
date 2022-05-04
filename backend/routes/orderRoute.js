import express from "express";
import {
  addOrderItems,
  getOrderbyItems,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(addOrderItems);
orderRouter.route("/:id").get(getOrderbyItems);

export default orderRouter;
