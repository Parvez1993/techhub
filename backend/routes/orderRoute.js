import express from "express";
import { addOrderItems } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(addOrderItems);

export default orderRouter;
