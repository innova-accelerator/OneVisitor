import { useContext, useCallback, useMemo } from 'react';
import { SiteVisitor } from '@/models/kiosk';
import { TenantContext } from '@/App';

export function useVisitorData(siteId?: string) {
  const { tenantId } = useContext(TenantContext);
  
  // Mock data - in a real app, this would come from an API
  const sites = useMemo(() => [
    { id: "main-office", name: "Main Office" },
    { id: "warehouse", name: "Warehouse" },
    { id: "branch-ny", name: "New York Branch" }
  ], []);
  
  const allVisitors: SiteVisitor[] = useMemo(() => [
    {
      id: "v1",
      siteId: "main-office",
      name: "John Doe",
      host: "Alice Smith",
      visitorType: "visitor",
      company: "ABC Corp",
      checkInTime: "09:30 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v2",
      siteId: "main-office",
      name: "Jane Smith",
      host: "Bob Johnson",
      visitorType: "contractor",
      company: "XYZ Contractors",
      checkInTime: "10:15 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v3",
      siteId: "warehouse",
      name: "Michael Brown",
      host: "Carol Williams",
      visitorType: "delivery",
      company: "FastShip Logistics",
      checkInTime: "11:45 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v4",
      siteId: "branch-ny",
      name: "Emily Wilson",
      host: "David Miller",
      visitorType: "visitor",
      company: "Global Enterprises",
      checkInTime: "14:20 PM",
      formResponses: {},
      status: "checked-out"
    }
  ], []);

  // Filter visitors by siteId if provided
  const visitors = useMemo(() => {
    return siteId ? allVisitors.filter(v => v.siteId === siteId) : allVisitors;
  }, [allVisitors, siteId]);
  
  const allVisitorTypes = useMemo(() => ["visitor", "contractor", "delivery", "interview"], []);
  
  const getSiteName = useCallback((siteId: string) => {
    const site = sites.find(site => site.id === siteId);
    return site ? site.name : siteId;
  }, [sites]);
  
  const handleExport = useCallback((data: SiteVisitor[]) => {
    // Convert data to CSV format
    const headers = ['Site', 'Visitor Name', 'Company', 'Type', 'Host', 'Check-In Time', 'Status'];
    const csvRows = [
      headers.join(','),
      ...data.map(visitor => [
        getSiteName(visitor.siteId),
        visitor.name,
        visitor.company || '',
        visitor.visitorType,
        visitor.host,
        visitor.checkInTime,
        visitor.status
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `visitors-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [getSiteName]);
  
  return {
    sites: siteId ? sites.filter(s => s.id === siteId) : sites,
    visitors,
    allVisitorTypes,
    getSiteName,
    handleExport
  };
}
