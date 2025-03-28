import api from "./api";
import { User, LoginCredentials, RegisterData } from "../types/auth.types";

export const AuthService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    const response = await api.post("/auth/login", credentials);

    // Store the token and user in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const response = await api.post("/auth/register", data);

    // Store the token and user in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/auth/me");
    return response.data.user;
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
