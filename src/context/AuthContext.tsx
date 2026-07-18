"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = Cookies.get("fintrack_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore malformed cookie
      }
    }
    setLoading(false);
  }, []);

  const persist = (token: string, userData: User) => {
    Cookies.set("fintrack_token", token, { expires: 7 });
    Cookies.set("fintrack_user", JSON.stringify(userData), { expires: 7 });
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    persist(data.token, data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    persist(data.token, data.user);
  };

  const demoLogin = async () => {
    const { data } = await api.post("/auth/demo-login");
    persist(data.token, data.user);
  };

  const googleLogin = async (idToken: string) => {
    const { data } = await api.post("/auth/google", { idToken });
    persist(data.token, data.user);
  };

  const logout = () => {
    Cookies.remove("fintrack_token");
    Cookies.remove("fintrack_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
