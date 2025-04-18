
import React, { useState } from "react";
import { Bell, ChevronDown, Search, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock notifications
  const notifications = [
    { id: 1, text: "New lead assigned", time: "5 minutes ago" },
    { id: 2, text: "Follow-up reminder: John Doe", time: "1 hour ago" },
    { id: 3, text: "Meeting scheduled with client", time: "3 hours ago" },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/select-crm");
    setShowUserMenu(false);
  };

  return (
    <header className={cn("h-16 flex items-center justify-between px-6 border-b glassmorphism", className)}>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium">
          {user?.crm_type 
            ? `${user.crm_type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('/')} CRM`
            : 'Employee CRM Panel'}
        </h2>
        
        <div className="hidden md:flex relative ml-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads, clients..."
            className="h-9 w-[300px] pl-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-md border border-border bg-card shadow-lg animate-fade-in z-50">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center">
                <Button variant="link" size="sm" className="w-full">View all notifications</Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block">
                {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
              </span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg animate-fade-in z-50">
              <div className="p-2">
                {user && (
                  <>
                    <div className="block rounded-md px-3 py-2 text-sm font-medium border-b mb-1">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block rounded-md px-3 py-2 text-sm w-full text-left hover:bg-muted transition-colors text-destructive"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!user && (
                  <button
                    onClick={() => navigate("/select-crm")}
                    className="block rounded-md px-3 py-2 text-sm w-full text-left hover:bg-muted transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
