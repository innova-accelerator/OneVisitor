
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { FilterIcon, DownloadIcon, RefreshIcon } from "lucide-react";

interface VisitorFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSites: string[];
  setSelectedSites: (sites: string[]) => void;
  visitorType: string;
  setVisitorType: (type: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  liveUpdates: boolean;
  setLiveUpdates: (live: boolean) => void;
  handleExport: () => void;
  sites: { id: string; name: string }[];
  allVisitorTypes: string[];
  siteId?: string; // Add this prop
}

export const VisitorFilters = ({ 
  searchQuery,
  setSearchQuery,
  selectedSites,
  setSelectedSites,
  visitorType,
  setVisitorType,
  date,
  setDate,
  liveUpdates,
  setLiveUpdates,
  handleExport,
  sites,
  allVisitorTypes,
  siteId // Use this prop
}: VisitorFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, company, or host..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Only show site filter if not in site-specific view */}
        {!siteId && (
          <div className="w-full md:w-64">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>
                    {selectedSites.length === 0 
                      ? "All Sites" 
                      : `${selectedSites.length} ${selectedSites.length === 1 ? "Site" : "Sites"}`}
                  </span>
                  <FilterIcon className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by site</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sites.map((site) => (
                  <DropdownMenuCheckboxItem
                    key={site.id}
                    checked={selectedSites.includes(site.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSites([...selectedSites, site.id]);
                      } else {
                        setSelectedSites(selectedSites.filter(id => id !== site.id));
                      }
                    }}
                  >
                    {site.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        
        <div className="w-full md:w-48">
          <Select
            value={visitorType}
            onValueChange={setVisitorType}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {allVisitorTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-40">
          <DatePicker
            date={date}
            setDate={setDate}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="live-updates" className="text-sm text-gray-600">
            Live Updates
          </label>
          <Switch
            id="live-updates"
            checked={liveUpdates}
            onCheckedChange={setLiveUpdates}
          />
        </div>
        
        <div>
          <Button onClick={handleExport} variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
