import { Document } from "mongoose";

export enum UserRole {
  REGULAR = "regular",
  ADMIN = "admin",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
