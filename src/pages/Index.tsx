
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/select-crm");
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to the CRM Panel</h1>
          <p className="text-muted-foreground">Manage your leads and track performance</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <Dashboard />
    </Layout>
  );
};

export default Index;
