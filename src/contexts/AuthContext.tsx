
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  crm_type: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  selectedCrmType: string | null;
  setSelectedCrmType: (type: string | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrmType, setSelectedCrmType] = useState<string | null>(
    localStorage.getItem("selectedCrmType")
  );

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      setIsLoading(true);
      
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (selectedCrmType) {
      localStorage.setItem("selectedCrmType", selectedCrmType);
    } else {
      localStorage.removeItem("selectedCrmType");
    }
  }, [selectedCrmType]);

  const login = async (email: string, password: string) => {
    try {
      // First, check if the selected CRM type matches the user's CRM type
      if (!selectedCrmType) {
        return { 
          success: false, 
          message: "Please select a CRM type first" 
        };
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        console.error("Login error:", error);
        return { 
          success: false, 
          message: "Invalid email or password" 
        };
      }

      // In a real app, you'd verify the password hash - here we just compare as plaintext
      if (data.password !== password) {
        return { 
          success: false, 
          message: "Invalid email or password" 
        };
      }

      // Check if the user's CRM type matches the selected one
      if (data.crm_type !== selectedCrmType) {
        return { 
          success: false, 
          message: `You don't have access to the ${selectedCrmType.replace('-', '/')} CRM` 
        };
      }

      // User authenticated successfully
      const user = {
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        crm_type: data.crm_type
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      
      return { 
        success: true, 
        message: "Login successful" 
      };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: "An error occurred during login" 
      };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        selectedCrmType,
        setSelectedCrmType,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
