import UnAuthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const adminAuth = async (req, res, next) => {
  try {
    req.admin = await User.findById(req.user.userId).select("-password");
    if (req.user.userId && req.admin.isAdmin === true) {
      next();
    }
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default adminAuth;
