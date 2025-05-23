
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
import { TenantProvider } from "./context/TenantContext"; 
import { createContext } from "react";
import { TenantBranding as TenantBrandingType } from "./models/tenant";

// Legacy context to be migrated - renamed to avoid conflicts
interface LegacyTenantContextType {
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBrandingType | null;
  setTenantBranding: (branding: TenantBrandingType | null) => void;
}

// Legacy context that will be replaced by the new TenantContext
export const LegacyTenantContext = createContext<LegacyTenantContextType>({
  currentTenant: null,
  setCurrentTenant: () => {},
  tenantBranding: null,
  setTenantBranding: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [currentTenant, setCurrentTenant] = useState<string | null>(null);
  const [tenantBranding, setTenantBranding] = useState<TenantBrandingType | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <LegacyTenantContext.Provider value={{ 
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
      </LegacyTenantContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
