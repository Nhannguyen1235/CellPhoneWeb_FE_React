import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const getUserFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "user") {
        return JSON.parse(decodeURIComponent(value));
      }
    }
    return null;
  };

  const user = getUserFromCookies();
  const isAdmin = user && user.role === "ROLE_ADMIN";

  return isAdmin ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;