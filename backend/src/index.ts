import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Import routes
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cartRoutes from "./routes/cart.routes";

import { notFound, errorHandler } from "./middleware/error.middleware";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
