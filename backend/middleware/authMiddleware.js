import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// The 'protect' middleware handles the TOKEN
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // Seen in your browser

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // We use 'userId' because that's what generateToken.js uses
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed"); // Your current error
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// The 'admin' middleware handles PERMISSIONS
const admin = (req, res, next) => {
  // Checks if 'isAdmin' is true in the database
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
