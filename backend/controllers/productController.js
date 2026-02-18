import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc           Fetch All products
// @route          GET /api/products
// @acces          Public

const getProducts = asyncHandler(async (req, res) => {
  // using the find({}) returns all the products in the collection

  const products = await Product.find({});

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("No products in database...");
  }
});

// @desc        Fetch single product by ID
// @route       GET /api/products/:id
// @access      Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("No such product exists");
  }
});

export { getProductById, getProducts };
