import path from "path";
import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import {
  createCategory,
  editCategory,
  getCategory,
  getCategorybyId,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(auth, createCategory);
categoryRouter.route("/get").get(getCategory);
categoryRouter.route("/:id").get(getCategorybyId);
categoryRouter.route("/:id/edit").patch(auth, editCategory);

////image upload

export { categoryRouter };
