import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// updated the code to get the returned value in const user
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, No token");
  }
});
