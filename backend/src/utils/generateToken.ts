import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { UserRole } from "../types/user.types";
import { Response } from "express";
const generateToken = (res: Response, id: string, role: UserRole): void => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const secret: Secret = process.env.JWT_SECRET;
  const options: SignOptions = {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  };
  const token = jwt.sign({ id, role }, secret, options);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
