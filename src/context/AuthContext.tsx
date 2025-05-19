
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("dashboard_user");
    const storedToken = localStorage.getItem("auth_token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Use the specified API endpoint
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      
      const data = await response.json();
      const authToken = data;

      console.log(authToken);
      
      // Save token to localStorage
      localStorage.setItem("auth_token", authToken);
      
      // Create user object
      const userInfo = {
        email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
      };
      
      // Set state and save to localStorage
      setUser(userInfo);
      setToken(authToken);
      localStorage.setItem("dashboard_user", JSON.stringify(userInfo));
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dashboard_user");
    localStorage.removeItem("auth_token");
    navigate("/");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, token }}>
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
