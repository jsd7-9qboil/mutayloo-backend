import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    // Verify the token using JWT_SECRET from environment variables
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
