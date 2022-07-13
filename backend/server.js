import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";

const app = express();
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  process.env.PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV.bgMagenta} mode, on port ${process.env.PORT}`.blue
      .underline.bold
  )
);
