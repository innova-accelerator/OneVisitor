
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
    if (!tenantId){
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];
      var tenant=subdomain
    }else{
      var tenant=tenantId
    }

    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const response = await api.get(`/sites/site?tenantId=${tenant}`);
      console.info(response)
      
      setSites(response.results);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (options.autoFetch) {
      fetchSites();
    }
  }, [tenantId, options.autoFetch]);

  const addSite=async(site)=>{
    const response=await api.post('/sites/site/', site);
    setSites([...sites, response])
  }
  
  return {
    sites,
    isLoading,
    error,
    refetch: fetchSites,
    addSite,
    updateSite: async (updatedSite) => {
      try {
        // Use PATCH for partial updates
        const response = await api.patch(`/sites/site/${updatedSite.id}/`, updatedSite);
        
        // Update local state with server response
        setSites(sites.map(site => 
          site.id === updatedSite.id ? { ...site, ...response } : site
        ));
        
        return response;
      } catch (error) {
        console.error('Failed to update site:', error);
        throw error;
      }
    },
    deleteSite: (siteId: string) => 
      setSites(sites.filter(site => site.id !== siteId)),
    togglePublish: async (siteId: string, published: boolean) => {
      try {
        // Use PATCH to update just the published field
        const updatedSite = await api.patch(`/sites/site/${siteId}/`, { published });
        
        // Update local state with server response
        setSites(sites.map(site => {
          if (site.id === siteId) {
            return {
              ...site,
              ...updatedSite, // Server will handle lastPublished automatically
            };
          }
          return site;
        }));
        
        return updatedSite;
      } catch (error) {
        console.error('Failed to toggle publish status:', error);
        throw error;
      }
    }

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

    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const response = await api.get(`/sites/site/search_by_url/?url=${siteId}`);
      
      setSite(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const submitVisitor=async(submissionData)=>{
    const response = await api.post('/sites/visitors/', submissionData);
    return response
  }
  
  useEffect(() => {
    if (siteId) {
      fetchSite();
    }
  }, [siteId]);
  
  return {
    site,
    isLoading,
    error,
    refetch: fetchSite,
    submitVisitor,
    updateSite: (updatedSite: KioskSite) => setSite(updatedSite)
  };
}
