import { StatusCodes } from "http-status-codes";
import Landing from "../models/Landing.js";

export const getLanding = async (req, res) => {
  const product = await Landing.find({});
  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

export const addLanding = async (req, res) => {
  const product = await Landing.create({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    subDescription: req.body.subDescription,
    image: req.body.image,
  });

  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};
