
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("dashboard_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Mock login - in a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation - in production this would be a real authentication
        if (username && password.length >= 6) {
          const user = {
            username,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`
          };
          
          setUser(user);
          localStorage.setItem("dashboard_user", JSON.stringify(user));
          setIsLoading(false);
          navigate("/dashboard");
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error("Invalid credentials. Password must be at least 6 characters."));
        }
      }, 1000); // Simulate network delay
    });
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboard_user");
    navigate("/");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
