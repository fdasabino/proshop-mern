import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

connectDB();

//Routes
app.use("/api/products", productRoutes);

// error handlers
app.use(errorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(
  process.env.PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV.bgMagenta} mode, on port ${process.env.PORT}`.blue
      .underline.bold
  )
);
