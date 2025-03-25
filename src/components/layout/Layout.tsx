
import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <Header />
        
        <main className={cn("flex-1 p-6 overflow-auto transition-all")}>
          {children}
        </main>
      </div>
    </div>
  );
};
