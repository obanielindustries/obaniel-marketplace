import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.get("/", protect, getCart);
cartRoutes.post("/add", protect, addToCart);
cartRoutes.delete("/:productId", protect, removeFromCart);

// mainroutes for all these things
export default cartRoutes;
