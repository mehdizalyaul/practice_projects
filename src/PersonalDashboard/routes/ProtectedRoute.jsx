import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
