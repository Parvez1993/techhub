import express from "express";
import {
  getUserProfile,
  getUsers,
  login,
  register,
  updateUserProfile,
} from "../controller/authController.js";
import adminAuth from "../middleware/adminAuth.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth, adminAuth, getUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(auth, getUserProfile);
router.route("/updateProfile/:id").put(auth, updateUserProfile);

export default router;
