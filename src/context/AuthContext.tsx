"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/services/authService";

type User = {
     id: string;
     name: string;
     email: string;
     firstName: string;
     lastName: string;
     isEmailVerified: boolean;
};

type AuthContextType = {
     user: User | null;
     token: string | null;
     login: (email: string, password: string) => Promise<void>;
     logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);
     const [token, setToken] = useState<string | null>(null);

     useEffect(() => {
          const savedToken = localStorage.getItem("token");
          const savedUser = localStorage.getItem("user");
          if (savedToken && savedUser) {
               setToken(savedToken);
               setUser(JSON.parse(savedUser));
          }
     }, []);

     const login = async (email: string, password: string) => {
          const data = await authService.login({ email, password });

          // guardar en localStorage
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));

          // actualizar estado
          setToken(data.accessToken);
          setUser({
               id: data.id,
               name: data.name,
               email: data.email,
               firstName: data.firstName,
               lastName: data.lastName,
               isEmailVerified: data.isEmailVerified,
          });
     };

     const logout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          window.location.href = "/login";
     };

     return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
     const ctx = useContext(AuthContext);
     if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
     return ctx;
};
