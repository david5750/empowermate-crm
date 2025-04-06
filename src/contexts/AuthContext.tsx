
import React, { createContext, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout, setCredentials, setSelectedCrmType } from "@/store/slices/authSlice";
import { useLoginMutation } from "@/store/apis/authApi";
import { clientFetcher } from "@/utils/clientFetcher";
import { setTokens, clearTokens, getAccessToken } from "@/utils/cookies";

type AuthContextType = {
  user: any;
  isLoading: boolean;
  selectedCrmType: string | null;
  setSelectedCrmType: (type: string | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, selectedCrmType } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginMutation] = useLoginMutation();

  // Check token validity on mount
  useEffect(() => {
    const validateToken = async () => {
      const token = getAccessToken();
      if (token && !user) {
        try {
          setIsLoading(true);
          // Call API to verify token and get user info
          const userData = await clientFetcher('/auth/me');
          dispatch(setCredentials({
            user: userData.user,
            token
          }));
        } catch (error) {
          console.error("Token validation failed:", error);
          clearTokens();
          dispatch(logout());
        } finally {
          setIsLoading(false);
        }
      }
    };

    validateToken();
  }, [dispatch, user]);

  const handleSetSelectedCrmType = (type: string | null) => {
    dispatch(setSelectedCrmType(type));
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // First, check if the selected CRM type is set
      if (!selectedCrmType) {
        return { 
          success: false, 
          message: "Please select a CRM type first" 
        };
      }

      // Call the API with the selectedCrmType
      const response = await loginMutation({ 
        email, 
        password,
        crm_type: selectedCrmType 
      }).unwrap();
      
      // Check if login was successful
      if (response.user && response.token) {
        // Store tokens in cookies
        setTokens(response.token, response.refreshToken);
        
        // Store user in Redux state
        dispatch(setCredentials({
          user: response.user,
          token: response.token
        }));
        
        return { 
          success: true, 
          message: "Login successful" 
        };
      } else {
        return { 
          success: false, 
          message: response.message || "Login failed" 
        };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Check for specific error about CRM type mismatch
      if (error.data && error.data.message === "Employee does not belong to the specified CRM type") {
        return { 
          success: false, 
          message: `You don't have access to the ${selectedCrmType.replace('-', '/')} CRM` 
        };
      }
      
      return { 
        success: false, 
        message: error.data?.message || "Invalid email or password" 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    clearTokens();
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        selectedCrmType,
        setSelectedCrmType: handleSetSelectedCrmType,
        login: handleLogin,
        logout: handleLogout
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
