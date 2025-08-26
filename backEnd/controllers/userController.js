// controllers/userController.js
import { response } from "express";
import asyncHandler from "../middleWare/asyncHandler .js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import Product from "../models/ProductModel.js";



// generate token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // valid for 7 days
  });
};



export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "User authenticated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        // don’t send password
      },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});








export const registerUser = asyncHandler(async (req, res) => {
  res.send("registerUser");
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.send("logoutUser");
});

export const getUserProfile = asyncHandler(async (req, res) => {

  const token = req.cookies.jwt; // read cookie

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user info to request
   const user = await User.findById(decoded.id).select("-password");
     res.json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("updateUserProfile");
});

export const getUsers = asyncHandler(async (req, res) => {
  res.send("getUsers");
});

export const getUserById = asyncHandler(async (req, res) => {
  res.send("getUserById");
});

export const deleteUser = asyncHandler(async (req, res) => {
  res.send("deleteUser");
});

export const updateUser = asyncHandler(async (req, res) => {
  res.send("updateUser");
});
