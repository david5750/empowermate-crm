
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = "/auth",
}) => {
  const { user, isLoading, selectedCrmType } = useAuth();
  const location = useLocation();
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If no CRM type is selected, redirect to select CRM page 
  // (except if we're already on that page)
  if (!selectedCrmType && location.pathname !== "/select-crm") {
    return <Navigate to="/select-crm" replace />;
  }

  // For auth required routes - redirect to login if not authenticated
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // For auth pages - redirect to home if already authenticated
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // Render children wrapped in Layout for authenticated routes
  if (requireAuth) {
    return <Layout>{children}</Layout>;
  }
  
  // For public pages, render without Layout
  return <>{children}</>;
};
