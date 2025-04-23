// src/contexts/AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Basic shape of your user object:
interface User {
  username: string;
  profilePictureUrl: string;
}

// What our context provides:
interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    // on init, try to read from localStorage
    const stored = localStorage.getItem("egallery_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("egallery_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("egallery_user");
    navigate("/auth", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
