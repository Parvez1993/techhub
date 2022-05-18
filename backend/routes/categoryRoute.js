import path from "path";
import express from "express";
import multer from "multer";

import {
  createCategory,
  editCategory,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(createCategory);
categoryRouter.route("/:id/edit").patch(editCategory);

////image upload

export { categoryRouter };
