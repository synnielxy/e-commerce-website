import { Request, Response } from "express";
import User from "../models/user.model";
import { UserDTO } from "../types/user.types";

// Map user to DTO (remove sensitive data)
const mapUserToDTO = (user: any): UserDTO => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      users: users.map(mapUserToDTO),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Get user by ID (admin only)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: mapUserToDTO(user),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User role updated successfully",
      user: mapUserToDTO(user),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error updating user role",
      error: error.message,
    });
  }
};
