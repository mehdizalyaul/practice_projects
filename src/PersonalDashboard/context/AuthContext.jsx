import { AuthApi } from "../services/index";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const isAuthenticated = !!token;

  const login = async (email, password) => {
    const res = await AuthApi.login(email, password);

    if (res.token) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.userId);
      localStorage.setItem("user", res.userId);
      return { success: true };
    } else {
      return { success: false, message: res.message };
    }
  };

  const register = async (name, email, password) => {
    const res = await AuthApi.register(name, email, password);

    if (res.token) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.userId);
      localStorage.setItem("user", res.userId);
      return { success: true };
    } else {
      return { success: false, message: res.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, register, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
