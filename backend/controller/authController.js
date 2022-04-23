import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import NotFoundError from "../errors/not-found.js";
import bcrypt from "bcryptjs";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  console.log("from create", user);

  res.cookie("jwt", token, cookieOptions);
  // user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const register = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all the values");
  }

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create(req.body);

  createSendToken(user, StatusCodes.CREATED, req, res);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    throw new BadRequestError("Please provide all the values");
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new UnAuthenticatedError("Incorrect credentials");
  }

  // 3) If everything ok, send token to client

  createSendToken(user, StatusCodes.CREATED, req, res);
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError("No user Found");
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  console.log(req.body.name, req.body.password);
  if (!user) {
    throw new NotFoundError("No user Found");
  } else {
    user.name = req.body.name;
    if (req.body.password) {
      // let newpass = await bcrypt.hash(req.body.password, 12);
      let newpass = req.body.password;
      console.log("new pass", newpass);
      user.password = newpass;
    }

    const saveUser = await user.save();

    console.log("save me", saveUser);

    createSendToken(saveUser, StatusCodes.ACCEPTED, req, res);
  }
};

export { login, register, getUserProfile, updateUserProfile };
