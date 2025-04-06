
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Leads from "./pages/Leads";
import Clients from "./pages/Clients";
import DemoClients from "./pages/DemoClients";
import Calls from "./pages/Calls";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SelectCrm from "./pages/SelectCrm";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Protected routes (require authentication) */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leads" 
                element={
                  <ProtectedRoute>
                    <Leads />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clients" 
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/demo-clients" 
                element={
                  <ProtectedRoute>
                    <DemoClients />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calls" 
                element={
                  <ProtectedRoute>
                    <Calls />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Public routes (no authentication required) */}
              <Route 
                path="/select-crm" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <SelectCrm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/auth" 
                element={
                  <ProtectedRoute requireAuth={false} redirectTo="/">
                    <Auth />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 catch-all */}
              <Route 
                path="*" 
                element={<NotFound />}
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
};

export default App;
