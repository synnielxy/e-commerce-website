import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import User from "../models/user.model";
import {
  LoginUserInput,
  RegisterUserInput,
  UserDTO,
  UserRole,
  IUser,
} from "../types/user.types";
import { Types } from "mongoose";

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

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: RegisterUserInput = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      // role: UserRole.ADMIN,
    });

    // Generate token
    if (user) {
      generateToken(
        res,
        (user._id as Types.ObjectId).toString(),
        user.role as UserRole
      );

      // Return user data
      return res.status(201).json({
        message: "User registered successfully",
        user: mapUserToDTO(user),
      });
    } else {
      return res.status(500).json({
        message: "Error registering user",
        error: "User not created",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid user data",
      error: error.message,
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginUserInput = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    generateToken(
      res,
      (user._id as Types.ObjectId).toString(),
      user.role as UserRole
    );

    // Return user data
    return res.status(201).json({
      message: "Login successful",
      user: mapUserToDTO(user),
      token: req.cookies.jwt,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

// Logout user
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await User.findById(req.user.id);
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
