import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
dotenv.config();

import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
const PORT = process.env.PORT || 4000;
connectDB();
const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// parse middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server started successfully on PORT ${PORT}`),
);
