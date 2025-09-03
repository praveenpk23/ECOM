// controllers/userController.js
import { response } from "express";
import asyncHandler from "../middleWare/asyncHandler .js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Product from "../models/ProductModel.js";
import bcrypt from "bcrypt";
// generate token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // valid for 7 days
  });
};

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
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
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  const hasPassword = bcrypt.hashSync(password, 10);
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password: hasPassword });
  if (user) {
    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // expire immediately
  });

  res.json({ message: "User logged out successfully" });
});

export const logoutFromAllDevices = asyncHandler(async (req, res) => {});

export const getUserProfile = asyncHandler(async (req, res) => {

  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const update = req.body;
  console.log(req.user);
  console.log(update);
  const newUser = await User.findByIdAndUpdate(req.user._id, update, {
    new: true,
  });
  res.json({ message: "updateUser", newUser });
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
