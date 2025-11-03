import { AuthApi } from "../services/index";
import { createContext, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const isAuthenticated = !!token;

  // 🔹 useMemo ensures decoding happens only when token changes
  const user = useMemo(() => {
    if (!token) return { id: null, role: null };
    try {
      const decoded = jwtDecode(token);
      return { id: decoded.userId, role: decoded.role };
    } catch {
      return { id: null, role: null };
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await AuthApi.login(email, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);

      // Decode immediately
      let decodedUser;
      try {
        const decoded = jwtDecode(res.token);
        decodedUser = { id: decoded.userId, role: decoded.role };
      } catch {
        decodedUser = { id: null, role: null };
      }

      return { success: true, user: decodedUser };
    }
    return { success: false, message: res.message };
  };

  const register = async (name, email, password) => {
    const res = await AuthApi.register(name, email, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, register, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
