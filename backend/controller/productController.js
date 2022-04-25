import { StatusCodes } from "http-status-codes";
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

export { getProducts, getProductsbyId };
