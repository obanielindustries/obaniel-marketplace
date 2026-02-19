import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  decrementCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.get("/", protect, getCart);
cartRoutes.post("/add", protect, addToCart);
// Changed to /decrement/:productId to match the logic and pass the ID
cartRoutes.post("/decrement/:productId", protect, decrementCart);
cartRoutes.delete("/:productId", protect, removeFromCart);

export default cartRoutes;
