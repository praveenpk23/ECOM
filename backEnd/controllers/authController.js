import jwt from "jsonwebtoken";

export const checkAuth = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true, user: decoded });
  });
};
