import express from "express";
import "express-async-errors";
import router from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import auth from "./middleware/auth.js";
import imageUploadRouter from "./routes/imageUploadRoute.js";
import path from "path";
import { categoryRouter } from "./routes/categoryRoute.js";
import { categoryUploadRouter } from "./routes/categoryImageUpload.js";
import landingRouter from "./routes/landingRoute.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// ------------------mongodb--------------------

const DB = process.env.DB;

mongoose.connect(DB, () => {
  console.log("connected");
});

app.use("/api/auth", router);
app.use("/api/products", productRouter);
app.use("/api/orders", auth, orderRouter);

//image upload

app.use("/api/upload", imageUploadRouter);
// /middleware

//category

app.use("/api/category", categoryRouter);

//image upload

app.use("/api/categoryUpload", categoryUploadRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//landing
app.use("/api/landing", landingRouter);
//mimic it since dirnmae doesnt work in es module

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  "/uploads/category",
  express.static(path.join(__dirname, "/uploads/category"))
);

//productions
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//unhandled error

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! ???? Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! ???? Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
