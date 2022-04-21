import express from "express";
import {
  getUserProfile,
  login,
  register,
  updateUserProfile,
} from "../controller/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(auth, getUserProfile);
router.route("/updateProfile/:id").put(auth, updateUserProfile);

export default router;
