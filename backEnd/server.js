import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'
// import authRoutes from './routes/authRoutes.js'
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";
import { authUser } from "./controllers/userController.js";

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
      credentials: true  // allow cookies & credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// MongoDB Connection

connectDB();





// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound)
app.use(errorHandler)
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


