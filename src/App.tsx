
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin/Admin";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { TenantBranding } from "@/models/tenant";

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
  // Tenant state management
  const [tenantId, setTenantId] = useState<string | null>("acme-corp");
  const [orgShortname, setOrgShortname] = useState<string | null>("acme-corp");
  const [currentTenant, setCurrentTenant] = useState<string | null>("acme-corp");
  const [tenantBranding, setTenantBranding] = useState<TenantBranding | null>({
    name: "Acme Corporation",
    logo: "https://placehold.co/100x50?text=ACME",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    font: "Inter, sans-serif"
  });

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TenantContext.Provider>
  );
};

export default App;
