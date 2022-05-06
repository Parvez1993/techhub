import express from "express";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  login,
  register,
  updateUserProfile,
  updateUserProfileAdmin,
} from "../controller/authController.js";
import adminAuth from "../middleware/adminAuth.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth, adminAuth, getUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(auth, getUserProfile);
router.route("/updateProfile/:id").put(auth, updateUserProfile);
router.route("/deleteUser/:id").delete(auth, adminAuth, deleteUser);
router.route("/updateUser/:id").put(auth, adminAuth, updateUserProfileAdmin);
export default router;
