import React, { createContext, useState, ReactNode, useEffect } from "react";
import AuthService from "@/services/auth.service";

// Define a minimal user type
interface User {
  id: string;
  username: string;
  role: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(AuthService.getUser());

  useEffect(() => {
    // Check if user is authenticated on mount
    if (AuthService.isAuthenticated()) {
      // Verify the token is still valid
      AuthService.getCurrentUser()
        .then((currentUser) => {
          setUser(currentUser);
        })
        .catch(() => {
          // If token is invalid, clear everything
          AuthService.logout();
          setUser(null);
        });
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
