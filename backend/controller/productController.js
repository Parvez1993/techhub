import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

const getProducts = async (req, res) => {
  let pageSize = 8;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * pageSize; //10

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const totalProducts = await Product.count(keyword);
  const numOfPages = Math.ceil(totalProducts / pageSize);
  const products = await Product.find(keyword).skip(skip).limit(pageSize);
  if (products) {
    res.status(StatusCodes.OK).json({
      products,
      page,
      totalProducts: products.length,
      numOfPages: numOfPages,
    });
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
    category: "62857b6507898709ca95af6e",
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
  console.log("category", req.body.category);
  console.log(req.body.countInStock);
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError("No product Found");
  } else {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.description = req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.image = req.body.image || req.image;

    const saveUser = await product.save();
    res.status(StatusCodes.ACCEPTED).json(saveUser);
  }
};

const updateReviews = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    let userdetail = await User.findById(req.user.userId).select("-password");

    const review = {
      name: userdetail.name,
      rating: Number(rating),
      comment,
      user: req.user.userId,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length; //5

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const findProductsbyCategory = async (req, res) => {
  console.log(req.params.id);
  let products = await Product.find({ category: req.params.id });

  if (products) {
    res.send(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const getTopProducts = async (req, res) => {
  let products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.send(products);
};

//get latest speakers

const getLastestSpeakers = async (req, res) => {
  let products = await Product.find({
    category: "628bd30e597351997d8c6d08",
  }).limit(3);

  res.json(products);
};

const getLastestPhone = async (req, res) => {
  // let products = await Product.find({}).populate({
  //   path: "category",
  //   match: {
  //     name: "Phone",
  //   },
  // });

  let products = await Product.find({
    category: "62857b6507898709ca95af6e",
  }).limit(3);

  res.json(products);
};

const getLastestHeadphone = async (req, res) => {
  let products = await Product.find({
    category: "628bd2297808c70bc1fef142",
  }).limit(3);

  res.json(products);
};

export {
  getProducts,
  getProductsbyId,
  deleteProductbyId,
  editProductbyId,
  addProductbyId,
  updateReviews,
  getTopProducts,
  findProductsbyCategory,
  getLastestSpeakers,
  getLastestPhone,
  getLastestHeadphone,
};
