import express from "express";
import {
  authUser,
  getUserById,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
  // Ensure you import these from your controller
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

// 1. PUBLIC & ADMIN COLLECTION ROUTES
// Registration hits /api/users
userRoutes.route("/").post(registerUser).get(protect, admin, getUsers);

// 2. AUTHENTICATION ROUTES
// Login hits /api/users/auth
userRoutes.post("/auth", authUser);
userRoutes.post("/logout", logoutUser);

// 3. PROFILE ROUTES (MUST BE ABOVE /:id)
// This fixes the "Cast to ObjectId failed" error
userRoutes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // Only 'protect' needed, no 'admin' here!

// 4. DYNAMIC ID ROUTES (LEAVE AT THE BOTTOM)
userRoutes
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default userRoutes;
