import {
  getProducts,
  getProductsbyId,
} from "../controller/productController.js";

import express from "express";

const productRouter = express.Router();

productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductsbyId);

export default productRouter;
