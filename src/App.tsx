
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import TenantAdmin from "./pages/TenantAdmin";
import { TenantBranding as TenantBrandingModel } from "./models/tenant";

// Create Tenant Context
export interface TenantContextType {
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBrandingModel | null;
  setTenantBranding: (branding: TenantBrandingModel | null) => void;
}

// Export TenantBranding type from models/tenant.ts directly to ensure consistency
export type TenantBranding = TenantBrandingModel;

export const TenantContext = createContext<TenantContextType>({
  currentTenant: null,
  setCurrentTenant: () => {},
  tenantBranding: null,
  setTenantBranding: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [currentTenant, setCurrentTenant] = useState<string | null>(null);
  const [tenantBranding, setTenantBranding] = useState<TenantBrandingModel | null>(null);

  // Parse tenant identifier from URL
  useEffect(() => {
    // Extract tenant from subdomain or path
    const extractTenant = () => {
      const hostname = window.location.hostname;
      
      // Check if we're on a subdomain
      if (hostname !== 'localhost' && hostname !== 'onevisitor.app') {
        const subdomain = hostname.split('.')[0];
        if (subdomain && subdomain !== 'www') {
          return subdomain;
        }
      }
      
      // Fallback for development - get from URL path or use default
      return 'acme-corp'; // Default for development
    };

    const tenant = extractTenant();
    setCurrentTenant(tenant);
    
    // In a real app, we would fetch tenant branding data
    // For now, set some reasonable defaults based on the tenant
    setTenantBranding({
      name: tenant === 'acme-corp' ? 'Acme Corporation' : 'OneVisitor',
      logo: tenant === 'acme-corp' ? 'https://placehold.co/100x50?text=ACME' : undefined,
      primaryColor: tenant === 'acme-corp' ? '#2563eb' : '#3B82F6',
      secondaryColor: tenant === 'acme-corp' ? '#1e40af' : '#2563EB',
      font: 'Inter, sans-serif'
    });
  }, []);

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
              <Route path="/checkin/:sitePath?" element={<CheckIn />} />
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
