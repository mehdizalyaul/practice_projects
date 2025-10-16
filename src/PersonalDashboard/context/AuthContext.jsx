import { createContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  //const [user, setUser] = useState(null);
  const isAuthenticated = !!token;
  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.token) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      //  setUser(email);
      return { success: true };
    } else {
      return { success: false, message: res.message };
    }
  };

  const register = async (name, email, password) => {
    const res = await registerUser(name, email, password);

    if (res.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      //    setUser(email);
      return { success: true };
    } else {
      return { success: false, message: res.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
