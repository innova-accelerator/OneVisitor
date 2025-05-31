import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin/Admin";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { TenantBranding } from "@/models/tenant";

// Helper function to extract subdomain from hostname
const getSubdomain = (): string | null => {
  const hostname = window.location.hostname;
  
  const parts = hostname.split('.');
    return parts[0];
};

// Define default branding
const defaultBranding: TenantBranding = {
  name: "OneVisitor",
  logo: undefined,
  primaryColor: "#3B82F6",
  secondaryColor: "#2563EB",
  font: "Inter, sans-serif"
};

// Create the context with proper types
export const TenantContext = React.createContext<{
  tenantId: string | null;
  orgShortname: string | null;
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBranding | null;
  setTenantBranding: (branding: TenantBranding | null) => void;
}>({
  tenantId: null,
  orgShortname: null,
  currentTenant: null,
  setCurrentTenant: () => {},
  tenantBranding: defaultBranding,
  setTenantBranding: () => {}
});

const App = () => {
  // Extract tenantId from subdomain immediately
  const extractedTenantId = getSubdomain();
  
  // Tenant state management - initialize with extracted tenantId
  const [tenantId, setTenantId] = useState<string | null>(extractedTenantId);
  const [orgShortname, setOrgShortname] = useState<string | null>(extractedTenantId);
  const [currentTenant, setCurrentTenant] = useState<string | null>(extractedTenantId);
  const [tenantBranding, setTenantBranding] = useState<TenantBranding | null>(
    extractedTenantId === 'acme-corp' ? {
      name: "Acme Corporation",
      logo: "https://placehold.co/100x50?text=ACME",
      primaryColor: "#2563eb",
      secondaryColor: "#1e40af",
      font: "Inter, sans-serif"
    } : defaultBranding
  );

  // Update tenant info if subdomain changes (for SPA navigation)
  useEffect(() => {
    const currentSubdomain = getSubdomain();
    if (currentSubdomain !== tenantId) {
      setTenantId(currentSubdomain);
      setOrgShortname(currentSubdomain);
      setCurrentTenant(currentSubdomain);
      
      // Update branding based on new tenant
      if (currentSubdomain === 'acme-corp') {
        setTenantBranding({
          name: "Acme Corporation",
          logo: "https://placehold.co/100x50?text=ACME",
          primaryColor: "#2563eb",
          secondaryColor: "#1e40af",
          font: "Inter, sans-serif"
        });
      } else {
        setTenantBranding(defaultBranding);
      }
    }
  }, [tenantId]);

  return (
    <TenantContext.Provider value={{ 
      tenantId,
      orgShortname,
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
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/checkin/:sitePath?" element={<CheckIn />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/:sitePath?" element={<CheckIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TenantContext.Provider>
  );
};

export default App;