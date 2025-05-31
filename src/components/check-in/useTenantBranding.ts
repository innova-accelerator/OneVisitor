
import { useState, useEffect, useContext } from "react";
import { TenantContext } from "@/App";

export interface DemoTenant {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
}

// Demo tenant branding data - in a real app this would come from API
const demoTenants: Record<string, DemoTenant> = {
  "acme-corp": {
    name: "Acme Corporation",
    logo: "https://placehold.co/200x200/3498db/FFFFFF/png?text=ACME",
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    font: "Inter, sans-serif"
  },
  "globex": {
    name: "Globex Industries",
    logo: "https://placehold.co/200x200/27ae60/FFFFFF/png?text=GLOBEX",
    primaryColor: "#27ae60",
    secondaryColor: "#2ecc71",
    font: "Roboto, sans-serif"
  },
  "wayne-ent": {
    name: "Wayne Enterprises",
    logo: "https://placehold.co/200x200/34495e/FFFFFF/png?text=WAYNE",
    primaryColor: "#34495e",
    secondaryColor: "#2c3e50",
    font: "Montserrat, sans-serif"
  },
  "stark-ind": {
    name: "Stark Industries",
    logo: "https://placehold.co/200x200/e74c3c/FFFFFF/png?text=STARK",
    primaryColor: "#e74c3c",
    secondaryColor: "#c0392b",
    font: "Poppins, sans-serif"
  },
};

export const useTenantBranding = (sitePath?: string) => {
  const { setCurrentTenant, setTenantBranding, tenantBranding } = useContext(TenantContext);
  useEffect(() => {
    // Extract tenant ID from site path or use default
    const currentTenantId = sitePath?.split('-')[0] || 'acme-corp';
    console.info(currentTenantId)
    if (currentTenantId && demoTenants[currentTenantId]) {
      setCurrentTenant(currentTenantId);
      setTenantBranding(demoTenants[currentTenantId]);
    } else {
      // Default branding
      setCurrentTenant(null);
      setTenantBranding(null);
    }
  }, [sitePath, setCurrentTenant, setTenantBranding]);
  
  return { tenantBranding };
};
