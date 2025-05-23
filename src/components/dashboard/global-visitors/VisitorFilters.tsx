
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Search, Download, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { KioskSite } from "@/models/kiosk";

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
  sites: KioskSite[];
  allVisitorTypes: string[];
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
  allVisitorTypes
}: VisitorFiltersProps) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">Search</div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search name, host, or company..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-1">Site</div>
          <Select
            onValueChange={(value) => setSelectedSites(value === "all" ? [] : [value])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Sites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              {sites.map(site => (
                <SelectItem key={site.id} value={site.id}>
                  {site.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-1">Visitor Type</div>
          <Select
            value={visitorType}
            onValueChange={setVisitorType}
          >
            <SelectTrigger className="w-[180px]">
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
        
        <div>
          <div className="text-sm font-medium mb-1">Date</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <Switch 
            id="live-updates" 
            checked={liveUpdates} 
            onCheckedChange={setLiveUpdates}
          />
          <label htmlFor="live-updates" className="text-sm font-medium cursor-pointer">
            Live updates
          </label>
          {liveUpdates && (
            <Badge variant="outline" className="bg-green-100 text-green-800 animate-pulse">
              <RefreshCw className="h-3 w-3 mr-1" /> Live
            </Badge>
          )}
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
