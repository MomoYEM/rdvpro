"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserRole } from "@/types";

interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rdvpro_role") as UserRole | null;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = (r: UserRole) => {
    setRoleState(r);
    localStorage.setItem("rdvpro_role", r);
  };

  const logout = () => {
    setRoleState(null);
    localStorage.removeItem("rdvpro_role");
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
