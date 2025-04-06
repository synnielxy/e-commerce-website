import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware";
import { UserRole } from "../types/user.types";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin-only routes
// create a new product
router.post(
  "/",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  createProduct
);

// fetch a product by ID
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  updateProduct
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  deleteProduct
);

export default router;
