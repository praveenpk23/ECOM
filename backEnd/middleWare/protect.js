import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.jwt; // read cookie

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
