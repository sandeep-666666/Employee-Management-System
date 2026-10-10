import { createContext, useContext, useState, useEffect } from "react";
import api from "../API/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check existing login session
  const refreshSession = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/session");
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  // Login
  const logIn = async (email, password, role_type) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
      role_type,
    });

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // Logout
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    logIn,
    logOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}
