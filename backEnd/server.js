import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
dotenv.config();
const app = express();

// Middleware
const allowOrigin = ["http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Invalid Origin"));
      }
    },
  })
);

app.use(express.json());

// MongoDB Connection

connectDB();
app.use(log);





// Routes
app.use("/api/products", productRoutes);
app.use(notFound)
app.use(errorHandler)
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

function log(req, res, next) {
  console.log("Log");
  next();
}
