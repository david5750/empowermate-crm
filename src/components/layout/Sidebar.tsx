
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  ChevronDown,
  CircleDollarSign,
  Clock,
  Compass,
  FileText,
  Import,
  Layers,
  Menu,
  Package,
  Phone,
  UserRound,
  Users2,
  X,
} from "lucide-react";

type NavigationItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

type CrmType = "export-import" | "gold-silver" | "clock-stock" | "visiting-book";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedCrm, setSelectedCrm] = useState<CrmType>("export-import");
  const [showCrmDropdown, setShowCrmDropdown] = useState(false);
  
  const location = useLocation();

  const crmTypes = [
    { id: "export-import", name: "Export/Import CRM", icon: Import },
    { id: "gold-silver", name: "Gold/Silver CRM", icon: CircleDollarSign },
    { id: "clock-stock", name: "Clock Stock CRM", icon: Clock },
    { id: "visiting-book", name: "Visiting Book Sales", icon: FileText },
  ];
  
  const navigation: NavigationItem[] = [
    { name: "Dashboard", path: "/", icon: Compass },
    { name: "Leads", path: "/leads", icon: Users2 },
    { name: "Clients", path: "/clients", icon: UserRound },
    { name: "Calls", path: "/calls", icon: Phone },
    { name: "Reports", path: "/reports", icon: BarChart2 },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleCrmSelect = (crmId: CrmType) => {
    setSelectedCrm(crmId);
    setShowCrmDropdown(false);
  };

  const currentCrm = crmTypes.find((crm) => crm.id === selectedCrm);
  const CurrentCrmIcon = currentCrm?.icon || Import;

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed bottom-4 right-4 z-50 md:hidden flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-sidebar border-r",
          isCollapsed ? "w-[70px]" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center px-4 border-b">
          <div className="flex items-center flex-1">
            {!isCollapsed && (
              <span className="font-semibold text-lg">CRM Panel</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors md:flex hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* CRM Type Selector */}
        <div className="p-4">
          <div className="relative">
            <button
              onClick={() => setShowCrmDropdown(!showCrmDropdown)}
              className={cn(
                "flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors",
                isCollapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <CurrentCrmIcon className="h-4 w-4" />
                </div>
                {!isCollapsed && <span>{currentCrm?.name}</span>}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4" />}
            </button>

            {showCrmDropdown && (
              <div
                className={cn(
                  "absolute left-0 z-10 mt-1 rounded-md border bg-card shadow-lg animate-fade-in",
                  isCollapsed ? "left-full ml-2 w-48" : "w-full"
                )}
              >
                <div className="p-1">
                  {crmTypes.map((crm) => {
                    const CrmIcon = crm.icon;
                    return (
                      <button
                        key={crm.id}
                        onClick={() => handleCrmSelect(crm.id as CrmType)}
                        className={cn(
                          "flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm hover:bg-muted transition-colors",
                          selectedCrm === crm.id && "bg-muted"
                        )}
                      >
                        <CrmIcon className="h-4 w-4" />
                        <span>{crm.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted transition-colors",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Package className="h-5 w-5" />
            {!isCollapsed && <span>v1.0.0</span>}
          </div>
        </div>
      </aside>
    </>
  );
};
