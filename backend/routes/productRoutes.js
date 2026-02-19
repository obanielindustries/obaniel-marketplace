import express from "express";
const productRoutes = express.Router();

import {
  getProductById,
  getProducts,
  createProduct, // New
  updateProduct, // New
  deleteProduct, // New
} from "../controllers/productController.js";

// Import your auth middlewares
import { protect, admin } from "../middleware/authMiddleware.js";

/**
 * @ROUTE: /api/products
 * GET: Public access to all products
 * POST: Admin only - Establish new manifest
 */
productRoutes.route("/").get(getProducts).post(protect, admin, createProduct);

/**
 * @ROUTE: /api/products/:id
 * GET: Public access to single product
 * PUT: Admin only - Update existing manifest
 * DELETE: Admin only - De-manifest from database
 */
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default productRoutes;
