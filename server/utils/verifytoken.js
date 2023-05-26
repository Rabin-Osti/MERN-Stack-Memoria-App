import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
export const verifyToken = async (req, res, next) => {
  
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    }
    throw new Error("No token!");
  } catch (error) {
    next(error);
  }
};
