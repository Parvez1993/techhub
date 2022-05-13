import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.status(StatusCodes.OK).json({ products });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

const getProductsbyId = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(StatusCodes.OK).json({ product });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

const addProductbyId = async (req, res) => {
  const product = await Product.create({
    user: req.user.userId,
    name: "Sample name",
    price: 0,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  if (product) {
    res.status(StatusCodes.OK).json({ product });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

const deleteProductbyId = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(StatusCodes.OK).json({ product });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no products found" });
  }
};

const editProductbyId = async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError("No product Found");
  } else {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.image = req.body.image || req.image;

    const saveUser = await product.save();
    res.status(StatusCodes.ACCEPTED).json(saveUser);
  }
};

export {
  getProducts,
  getProductsbyId,
  deleteProductbyId,
  editProductbyId,
  addProductbyId,
};
