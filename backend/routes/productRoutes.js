import express from "express";
const productRoutes = express.Router();

import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

productRoutes.route("/").get(getProducts);

productRoutes.route("/:id").get(getProductById);

export default productRoutes;
