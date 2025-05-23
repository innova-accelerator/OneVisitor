
import { useState } from "react";
import { DashboardMetricsCards } from "./global-visitors/DashboardMetricsCards";
import { VisitorFilters } from "./global-visitors/VisitorFilters";
import { GlobalVisitorsTable } from "./global-visitors/GlobalVisitorsTable";
import { useVisitorData } from "./global-visitors/useVisitorData";
import { StatsCards } from "./StatsCards";

interface GlobalVisitorsDashboardProps {
  siteId?: string;
}

export const GlobalVisitorsDashboard = ({ siteId }: GlobalVisitorsDashboardProps) => {
  const { sites, visitors, allVisitorTypes, getSiteName, handleExport } = useVisitorData(siteId);
  
  const [selectedSites, setSelectedSites] = useState<string[]>(siteId ? [siteId] : []);
  const [searchQuery, setSearchQuery] = useState("");
  const [visitorType, setVisitorType] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [liveUpdates, setLiveUpdates] = useState(false);

  // Filter visitors based on search query, selected sites, and visitor type
  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      searchQuery === "" || 
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      visitor.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (visitor.company && visitor.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSites = siteId 
      ? visitor.siteId === siteId 
      : (selectedSites.length === 0 || selectedSites.includes(visitor.siteId));
    
    const matchesType = visitorType === "" || visitor.visitorType === visitorType;
    
    return matchesSearch && matchesSites && matchesType;
  });

  // Export filtered visitors data
  const exportVisitorsData = () => {
    handleExport(filteredVisitors);
  };

  return (
    <div>
      {siteId && <StatsCards siteId={siteId} />}
      
      <DashboardMetricsCards 
        visitors={visitors} 
        sites={sites} 
      />

      <VisitorFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSites={selectedSites}
        setSelectedSites={setSelectedSites}
        visitorType={visitorType}
        setVisitorType={setVisitorType}
        date={date}
        setDate={setDate}
        liveUpdates={liveUpdates}
        setLiveUpdates={setLiveUpdates}
        handleExport={exportVisitorsData}
        sites={sites}
        allVisitorTypes={allVisitorTypes}
        siteId={siteId}
      />

      <GlobalVisitorsTable 
        filteredVisitors={filteredVisitors}
        getSiteName={getSiteName}
      />
    </div>
  );
};
