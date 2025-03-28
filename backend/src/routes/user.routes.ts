import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
} from "../controllers/user.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware";
import { UserRole } from "../types/user.types";

const router = express.Router();

// Admin-only routes
router.get("/", authenticateToken, authorizeRoles(UserRole.ADMIN), getAllUsers);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  getUserById
);

router.patch(
  "/:id/role",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  updateUserRole
);

export default router;
