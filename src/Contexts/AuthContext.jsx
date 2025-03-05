import React, { createContext, useState, useContext, useEffect } from "react";
import { login as loginAPI, register as registerAPI } from "../api/Auth";

const AuthContext = createContext(null);

// Role-based permissions mapping
const rolePermissions = {
  ADMIN: [
    "/dashboard",
    "/courses",
    "/papers",
    "/questions",
    "/approvals",
    "/register",
    "/login",
  ],
  FACULTY: ["/papers", "/questions", "/dashboard", "/login"],
  COORDINATOR: ["/courses", "/dashboard", "/approvals", "/login"],
  MODERATOR: ["/courses", "/dashboard", "/approvals", "/login"],
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Update authentication status when token changes
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (email, password) => {
    try {
      let response;

      // Static Login Credentials for Testing
      const users = {
        "jayakumar@gmail.com": { password: "123456", role: "ADMIN", id: "1" },
        "coordinator@gmail.com": {
          password: "456",
          role: "COORDINATOR",
          id: "2",
        },
        "faculty@gmail.com": { password: "789", role: "FACULTY", id: "3" },
        "moderator@gmail.com": { password: "012", role: "MODERATOR", id: "4" }, // Added moderator
      };

      if (users[email] && users[email].password === password) {
        response = {
          token: "dummyToken",
          role: users[email].role,
          id: users[email].id,
        };
      } else {
        response = await loginAPI(email, password); // API login
      }

      setToken(response.token);
      setRole(response.role);
      setUserId(response.id);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.id);

      return response.role; // Return role for navigation purposes
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  };

  const register = async (name, email, password, role) => {
    try {
      await registerAPI(name, email, password, role);
      await login(email, password); // Auto-login after registration
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration error");
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  // Check if user has permission to access a specific route
  const hasPermission = (path) => {
    if (!role) return path === "/login" || path === "/register";
    return rolePermissions[role]?.includes(path) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        userId,
        isAuthenticated,
        login,
        register,
        logout,
        hasPermission,
        rolePermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
