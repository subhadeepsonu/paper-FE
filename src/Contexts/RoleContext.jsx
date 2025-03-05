// src/Contexts/RoleContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Define access permissions for each role
const rolePermissions = {
  Admin: [
    "/dashboard",
    "/courses",
    "/papers",
    "/questions",
    "/approvals",
    "/register",
    "/login",
  ],
  Faculty: ["/papers", "/questions", "/dashboard", "/login"],
  Coordinator: ["/courses", "/dashboard", "/approvals", "/login"],
  Moderator: ["/courses", "/dashboard", "/approvals", "/login"],
};

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(user?.role || "Guest");

  const hasAccess = (path) => {
    if (!userRole || userRole === "Guest")
      return path === "/login" || path === "/register";
    return rolePermissions[userRole]?.includes(path) || false;
  };

  return (
    <RoleContext.Provider
      value={{ userRole, setUserRole, hasAccess, rolePermissions }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
