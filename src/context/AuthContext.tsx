// src/contexts/AuthContext.tsx

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI, logout as logoutAPI } from "../api/authServices";
import { getCurrentUser } from "../api/usersService";
import { notification } from "antd";

interface User {
  id: string;
  username: string;
  profilePictureUrl: string;
  fullName: string;
  email: string;
  bio?: string;
  roles: string[];
  isFollowing?: boolean; // Optional, if applicable
  followerCount?: number; // Optional, if applicable
  artCount?: number; // Optional, if applicable
  artworks?: any[]; // Optional, if applicable
  totalLikes?: number; // Optional, if applicable
  totalComments?: number; // Optional, if applicable
  slug?: string; // Optional, if applicable
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [api] = notification.useNotification();

  const init = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const fetchedUser = await getCurrentUser();
      setUser(fetchedUser);
    } catch {
      logout(); // Token likely invalid
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const login = async (credentials: any) => {
    try {
      const { token } = await loginAPI(credentials);
      localStorage.setItem("token", token);
      const fetchedUser = await getCurrentUser();
      localStorage.setItem("egallery_user", JSON.stringify(fetchedUser));
      setUser(fetchedUser);
      api.success({ message: "Login Successful" });
      navigate("/", { replace: true });
    } catch (error: any) {
      api.error({
        message: "Login Failed",
        description: error.message || "An error occurred",
      });
      throw error;
    }
  };

  const logout = () => {
    logoutAPI();
    setUser(null);
    localStorage.removeItem("egallery_user");
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
