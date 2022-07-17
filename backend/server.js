import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//API entrypoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// error handlers
app.use(errorHandler);
app.use(notFound);

// PORT
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server Running in ${PORT.bgMagenta} mode, on port ${PORT}`.blue.underline.bold)
);
