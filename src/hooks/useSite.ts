
import { useState, useEffect } from 'react';
import { KioskSite } from '@/models/kiosk';
import { useApi } from './useApi';
import { useTenant } from '@/context/TenantContext';

/**
 * Hook for fetching a list of sites
 */
export function useSiteList(options = { autoFetch: true }) {
  const { tenantId } = useTenant();
  const api = useApi();
  const [sites, setSites] = useState<KioskSite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchSites = async () => {
    if (!tenantId) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await api.get<KioskSite[]>(`/sites?tenantId=${tenantId}`);
      
      // Using mock data for now
      const mockSites: KioskSite[] = [
        {
          id: "main-office",
          tenantId: tenantId,
          name: "Main Office",
          url: "main-office",
          urlType: "path",
          published: true,
          branding: {
            logo: "https://placehold.co/200x100?text=MainOffice",
            primaryColor: "#2563eb",
            secondaryColor: "#1e40af",
            favicon: "https://placehold.co/32x32?text=MO"
          },
          welcomeMessage: "Welcome to our main office! Please check in.",
          language: "en",
          lastPublished: "2023-04-15T10:30:00Z",
          visitorTypes: [
            { id: "visitor", name: "Visitor", icon: "User" },
            { id: "contractor", name: "Contractor", icon: "Briefcase" },
            { id: "interview", name: "Interview", icon: "Clipboard" }
          ],
          formFields: [
            { id: "name", label: "Full Name", type: "text", required: true },
            { id: "email", label: "Email", type: "email", required: true },
            { id: "company", label: "Company", type: "text", required: false },
            { id: "host", label: "Host", type: "select", required: true }
          ],
          visitorCount: 12
        },
        {
          id: "warehouse",
          tenantId: tenantId,
          name: "Warehouse",
          url: "warehouse-door",
          urlType: "path",
          published: false,
          branding: {
            logo: "https://placehold.co/200x100?text=Warehouse",
            primaryColor: "#10b981",
            secondaryColor: "#059669",
            favicon: "https://placehold.co/32x32?text=WH"
          },
          welcomeMessage: "Welcome to our warehouse facility.",
          language: "en",
          lastPublished: null,
          visitorTypes: [
            { id: "delivery", name: "Delivery", icon: "Package" },
            { id: "visitor", name: "Visitor", icon: "User" }
          ],
          formFields: [
            { id: "name", label: "Full Name", type: "text", required: true },
            { id: "company", label: "Company", type: "text", required: true },
            { id: "purpose", label: "Purpose of Visit", type: "text", required: true }
          ],
          visitorCount: 5
        }
      ];
      
      setSites(mockSites);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (options.autoFetch && tenantId) {
      fetchSites();
    }
  }, [tenantId, options.autoFetch]);
  
  return {
    sites,
    isLoading,
    error,
    refetch: fetchSites,
    addSite: (site: KioskSite) => setSites([...sites, site]),
    updateSite: (updatedSite: KioskSite) => 
      setSites(sites.map(site => site.id === updatedSite.id ? updatedSite : site)),
    deleteSite: (siteId: string) => 
      setSites(sites.filter(site => site.id !== siteId)),
    togglePublish: (siteId: string, published: boolean) =>
      setSites(sites.map(site => {
        if (site.id === siteId) {
          return {
            ...site,
            published,
            lastPublished: published ? new Date().toISOString() : site.lastPublished
          };
        }
        return site;
      }))
  };
}

/**
 * Hook for fetching site details
 */
export function useSiteDetails(siteId: string | undefined) {
  const { tenantId } = useTenant();
  const api = useApi();
  const [site, setSite] = useState<KioskSite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchSite = async () => {
    if (!siteId || !tenantId) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await api.get<KioskSite>(`/sites/${siteId}?tenantId=${tenantId}`);
      
      // Using mock data for now
      const mockSite: KioskSite = {
        id: siteId,
        tenantId: tenantId,
        name: siteId === "main-office" ? "Main Office" : "Warehouse",
        url: siteId,
        urlType: "path",
        published: true,
        branding: {
          logo: `https://placehold.co/200x100?text=${siteId}`,
          primaryColor: "#2563eb",
          secondaryColor: "#1e40af",
          favicon: `https://placehold.co/32x32?text=${siteId}`
        },
        welcomeMessage: `Welcome to our ${siteId} location! Please check in.`,
        language: "en",
        lastPublished: "2023-04-15T10:30:00Z",
        visitorTypes: [
          { id: "visitor", name: "Visitor", icon: "User" },
          { id: "contractor", name: "Contractor", icon: "Briefcase" }
        ],
        formFields: [
          { id: "name", label: "Full Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "company", label: "Company", type: "text", required: false },
          { id: "host", label: "Host", type: "select", required: true }
        ],
        visitorCount: 10
      };
      
      setSite(mockSite);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (siteId && tenantId) {
      fetchSite();
    }
  }, [siteId, tenantId]);
  
  return {
    site,
    isLoading,
    error,
    refetch: fetchSite,
    updateSite: (updatedSite: KioskSite) => setSite(updatedSite)
  };
}
