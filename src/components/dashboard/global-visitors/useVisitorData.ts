import { useContext, useState, useEffect } from 'react';
import { SiteVisitor } from '@/models/kiosk';
import { TenantContext } from '@/App';
import { useApi } from '@/hooks/useApi';

export function useVisitorData(siteId?: string) {
  const { tenantId } = useContext(TenantContext);
  const api = useApi();
  
  // State
  const [sites, setSites] = useState([]);
  const [visitors, setVisitors] = useState<SiteVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // Fetch data
  const fetchData = async () => {
    if (!tenantId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch sites
      const sitesResponse = await api.get(`/sites/site?tenantId=${tenantId}`);
      const sitesData = sitesResponse.results || [];
      setSites(sitesData.map((site: any) => ({
        id: site.id.toString(),
        name: site.name
      })));
      
      // Fetch visitors
      const visitorsUrl = siteId 
        ? `/sites/visitors?site=${siteId}&tenantId=${tenantId}`
        : `/sites/visitors?tenantId=${tenantId}`;
      
      const visitorsResponse = await api.get(visitorsUrl);
      const visitorsData = visitorsResponse.results || [];
      setVisitors(visitorsData)
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [tenantId, siteId]); // Remove api and fetchData from dependencies

  // Helper functions
  const formatCheckInTime = (checkInString: string) => {
    try {
      if (checkInString.includes('AM') || checkInString.includes('PM')) {
        return checkInString;
      }
      const date = new Date(checkInString);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      return checkInString;
    }
  };

  const getSiteName = (siteId: string) => {
    const site = sites.find((site: any) => site.id === siteId);
    return site ? site.name : `Site ${siteId}`;
  };

  // CRUD operations
  const createVisitor = async (visitorData: any, photoFile?: File) => {
    const formData = new FormData();
    
    Object.entries(visitorData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    
    if (siteId) formData.append('site', siteId);
    if (photoFile) formData.append('photo', photoFile);
    formData.append('checkIn', new Date().toISOString());
    
    const newVisitor = await api.post('/sites/visitors/', formData);
    await fetchData(); // Refresh data
    return newVisitor;
  };

  const updateVisitor = async (visitorId: string, updates: any) => {
    const updatedVisitor = await api.patch(`/sites/visitors/${visitorId}/`, updates);
    await fetchData(); // Refresh data
    return updatedVisitor;
  };

  const deleteVisitor = async (visitorId: string) => {
    await api.delete(`/sites/visitors/${visitorId}/`);
    await fetchData(); // Refresh data
  };

  const handleExport = (data: SiteVisitor[]) => {
    const headers = ['Site', 'Visitor Name', 'Company', 'Type', 'Host', 'Check-In Time', 'Status', 'Email', 'Phone', 'Purpose'];
    const csvRows = [
      headers.join(','),
      ...data.map(visitor => [
        getSiteName(visitor.siteId),
        visitor.name,
        visitor.company || '',
        visitor.visitorType,
        visitor.host_name,
        visitor.checkIn,
        visitor.status,
        visitor?.email || '',
        visitor?.phone || '',
        visitor?.purpose || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `visitors-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allVisitorTypes = [...new Set(visitors.map(v => v.visitorType).filter(Boolean))];
  if (allVisitorTypes.length === 0) {
    allVisitorTypes.push("visitor", "contractor", "delivery", "interview");
  }

  return {
    sites,
    visitors,
    allVisitorTypes,
    loading,
    error,
    getSiteName,
    handleExport,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    refetchVisitors: fetchData
  };
}