import api from "./api";
import { User, LoginCredentials, RegisterData } from "../types/auth.types";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const AuthService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post("/auth/login", credentials);

      // Store the token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new AuthError("Invalid email or password");
      } else if (error.response?.status === 400) {
        throw new AuthError(
          error.response.data.message || "Invalid input data"
        );
      } else {
        throw new AuthError(
          "An error occurred during login. Please try again."
        );
      }
    }
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post("/auth/register", data);

      // Store the token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new AuthError(
          error.response.data.message || "Invalid input data"
        );
      } else if (error.response?.status === 409) {
        throw new AuthError("Email already exists");
      } else {
        throw new AuthError(
          "An error occurred during registration. Please try again."
        );
      }
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error: any) {
      // Even if logout fails, we should clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new AuthError("An error occurred during logout. Please try again.");
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get("/auth/me");
      return response.data.user;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new AuthError("Session expired. Please login again.");
      } else {
        throw new AuthError("Failed to fetch user data. Please try again.");
      }
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user ? user.role === "admin" : false;
  },
};

export default AuthService;
