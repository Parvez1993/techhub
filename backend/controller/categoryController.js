import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.js";

const getCategory = async (req, res) => {
  const category = await Category.find({});

  if (category) {
    res.status(StatusCodes.OK).json(category);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no category found" });
  }
};

const createCategory = async (req, res) => {
  const category = await Category.create({
    name: "Sample name",
    description: 0,
    image: "/images/sample.jpg",
  });

  if (category) {
    res.status(StatusCodes.OK).json(category);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no category created" });
  }
};

const editCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  console.log(category);
  if (!category) {
    throw new NotFoundError("No category Found");
  } else {
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;
    category.image = req.body.image || category.image;

    const categorySave = await category.save();
    res.status(StatusCodes.ACCEPTED).json(categorySave);
  }
};

const getCategorybyId = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.status(StatusCodes.OK).json({ category });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

export { createCategory, editCategory, getCategory, getCategorybyId };
