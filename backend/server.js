import express from "express";
import "express-async-errors";
import router from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import products from "./data/products.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import auth from "./middleware/auth.js";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.use(morgan("dev"));

// ------------------mongodb--------------------

const DB = process.env.DB;

mongoose.connect(DB, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/auth", router);
app.use("/api/products", productRouter);
app.use("/api/orders", auth, orderRouter);
// /middleware

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//unhandled error

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
