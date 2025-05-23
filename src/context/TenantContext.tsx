
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TenantBranding } from "@/models/tenant";

interface TenantContextType {
  tenantId: string | null;
  orgShortname: string | null;
  currentTenant: string | null;
  setCurrentTenant: (tenant: string | null) => void;
  tenantBranding: TenantBranding | null;
  setTenantBranding: (branding: TenantBranding | null) => void;
}

const defaultTenantContext: TenantContextType = {
  tenantId: null,
  orgShortname: null,
  currentTenant: null,
  setCurrentTenant: () => {},
  tenantBranding: null,
  setTenantBranding: () => {}
};

export const TenantContext = createContext<TenantContextType>(defaultTenantContext);

export const useTenant = () => useContext(TenantContext);

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider = ({ children }: TenantProviderProps) => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [orgShortname, setOrgShortname] = useState<string | null>(null);
  const [currentTenant, setCurrentTenant] = useState<string | null>(null);
  const [tenantBranding, setTenantBranding] = useState<TenantBranding | null>(null);

  // Extract tenant information from the URL or local storage
  useEffect(() => {
    const extractTenant = () => {
      const hostname = window.location.hostname;
      
      // Check if we're on a subdomain
      if (hostname !== 'localhost' && hostname !== 'onevisitor.app') {
        const subdomain = hostname.split('.')[0];
        if (subdomain && subdomain !== 'www') {
          return { id: subdomain, shortname: subdomain };
        }
      }
      
      // Fallback for development
      return { id: 'acme-corp', shortname: 'acme-corp' };
    };

    const { id, shortname } = extractTenant();
    setTenantId(id);
    setOrgShortname(shortname);
    setCurrentTenant(id);
    
    // In a real app, we would fetch tenant branding data from an API
    setTenantBranding({
      name: id === 'acme-corp' ? 'Acme Corporation' : 'OneVisitor',
      logo: id === 'acme-corp' ? 'https://placehold.co/100x50?text=ACME' : undefined,
      primaryColor: id === 'acme-corp' ? '#2563eb' : '#3B82F6',
      secondaryColor: id === 'acme-corp' ? '#1e40af' : '#2563EB',
      font: 'Inter, sans-serif'
    });
  }, []);

  const value = {
    tenantId,
    orgShortname,
    currentTenant,
    setCurrentTenant,
    tenantBranding,
    setTenantBranding
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};
