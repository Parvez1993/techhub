import express from "express";
import { addOrderItems, getOrderById } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(addOrderItems);
orderRouter.route("/:id").get(getOrderById);

export default orderRouter;
