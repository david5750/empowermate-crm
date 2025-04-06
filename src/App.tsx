
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
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
import { useAppSelector } from "./hooks/redux";

// Route wrapper that redirects to auth page if not authenticated
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

// App component with routes
const AppRoutes = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Index /> : <Navigate to="/select-crm" />} 
      />
      <Route path="/select-crm" element={<SelectCrm />} />
      <Route path="/auth" element={<Auth />} />
      <Route 
        path="/leads" 
        element={<PrivateRoute><Leads /></PrivateRoute>} 
      />
      <Route 
        path="/clients" 
        element={<PrivateRoute><Clients /></PrivateRoute>} 
      />
      <Route 
        path="/demo-clients" 
        element={<PrivateRoute><DemoClients /></PrivateRoute>} 
      />
      <Route 
        path="/calls" 
        element={<PrivateRoute><Calls /></PrivateRoute>} 
      />
      <Route 
        path="/reports" 
        element={<PrivateRoute><Reports /></PrivateRoute>} 
      />
      <Route 
        path="/settings" 
        element={<PrivateRoute><Settings /></PrivateRoute>} 
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
};

export default App;
