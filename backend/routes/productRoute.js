import {
  addProductbyId,
  deleteProductbyId,
  editProductbyId,
  getProducts,
  getProductsbyId,
  updateReviews,
} from "../controller/productController.js";

import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";
const productRouter = express.Router();

productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductsbyId);
productRouter.route("/addProducts").post(auth, adminAuth, addProductbyId);
productRouter.route("/:id/delete").delete(auth, adminAuth, deleteProductbyId);
productRouter.route("/:id/edit").patch(auth, adminAuth, editProductbyId);
productRouter.route("/:id/reviews").post(auth, updateReviews);

export default productRouter;
