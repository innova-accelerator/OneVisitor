
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import TenantAdmin from "./pages/TenantAdmin";
import { TenantBranding } from "./models/tenant";
import { TenantProvider, TenantContext } from "./context/TenantContext";

// Legacy context to be migrated
export interface TenantContextType {
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBranding | null;
  setTenantBranding: (branding: TenantBranding | null) => void;
}

// Export TenantBranding type from models/tenant.ts directly to ensure consistency
export type TenantBranding = TenantBranding;

// Legacy context that will be replaced by the new TenantContext
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

  return (
    <QueryClientProvider client={queryClient}>
      <TenantContext.Provider value={{ 
        currentTenant, 
        setCurrentTenant,
        tenantBranding,
        setTenantBranding
      }}>
        <TenantProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/checkin/:sitePath?" element={<CheckIn />} />
                <Route path="/admin/tenants" element={<TenantAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TenantProvider>
      </TenantContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
