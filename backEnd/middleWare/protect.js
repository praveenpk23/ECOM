import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
export const protect = asyncHandler(async  (req, res, next) => {
  const token = req.cookies.jwt; // read cookie

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id).select("-password");
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
})


export const admin= (req,res,next)=>{
  if(req.user && req.user.isAdmin){
    next();
  }else{
    res.status(401).json({ message: "Not authorized as an admin" });
  }
}