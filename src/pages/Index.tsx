
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/select-crm");
  };

  // Get CRM type display name
  const crmTypeDisplay = user?.crm_type
    ? user.crm_type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('/')
    : '';

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to the {crmTypeDisplay} CRM Panel</h1>
          <p className="text-muted-foreground">
            Hello {user?.first_name} {user?.last_name}, manage your leads and track performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm bg-primary/10 px-3 py-1.5 rounded-md">
            <User className="h-4 w-4 text-primary" />
            <span>{user?.email}</span>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      <Dashboard />
    </Layout>
  );
};

export default Index;
