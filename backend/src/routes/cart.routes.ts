import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

// All routes are protected and require authentication
router.use(authenticateToken);

// Get cart
router.get("/", getCart);

// Add item to cart
router.post("/items", addToCart);

// Update cart item quantity
router.put("/items/:productId", updateCartItem);

// Remove item from cart
router.delete("/items/:productId", removeFromCart);

// Clear cart
router.delete("/clear", clearCart);

export default router;
