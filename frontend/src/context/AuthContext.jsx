import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    const storedUser = localStorage.getItem("cms_user");
    const storedToken = localStorage.getItem("cms_token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
    };
  } catch {
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getStoredAuth().user);
  const [token, setToken] = useState(() => getStoredAuth().token);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("cms_user", JSON.stringify(user));
      localStorage.setItem("cms_token", token);
    } else {
      localStorage.removeItem("cms_user");
      localStorage.removeItem("cms_token");
    }
  }, [user, token]);

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const parseJsonSafe = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }

    setUser(data.user);
    setToken(data.token);

    navigate(
      data.user.role === "admin"
        ? "/admin/dashboard"
        : "/contractor/dashboard"
    );
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(data?.message || "Registration failed");
    }

    setUser(data.user);
    setToken(data.token);
    navigate(
      data.user.role === "admin"
        ? "/admin/dashboard"
        : "/contractor/dashboard"
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

