
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import Muster from "./pages/Muster";
import NotFound from "./pages/NotFound";
import TenantAdmin from "./pages/TenantAdmin";

// Create Tenant Context
export interface TenantContextType {
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBranding | null;
  setTenantBranding: (branding: TenantBranding | null) => void;
}

export interface TenantBranding {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
}

export const TenantContext = createContext<TenantContextType>({
  currentTenant: null,
  setCurrentTenant: () => {},
  tenantBranding: null,
  setTenantBranding: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [currentTenant, setCurrentTenant] = useState<string | null>(null);
  const [tenantBranding, setTenantBranding] = useState<TenantBranding | null>(null);

  // Parse subdomain/path tenant identifier
  const parseTenant = () => {
    // Logic to extract tenant from subdomain or path
    // e.g., acme.onevisitor.app or onevisitor.app/acme
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TenantContext.Provider value={{ 
        currentTenant, 
        setCurrentTenant,
        tenantBranding,
        setTenantBranding
      }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/checkin/:tenantId?" element={<CheckIn />} />
              <Route path="/muster/:tenantId?" element={<Muster />} />
              <Route path="/admin/tenants" element={<TenantAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TenantContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
