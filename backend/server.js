const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const products = require("./data/products.js");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((i) => i._id === id);
  res.status(200).json(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
