
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Search, Download, RefreshCw } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { SiteVisitor, KioskSite } from "@/models/kiosk";
import { format } from "date-fns";

export const GlobalVisitorsDashboard = () => {
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visitorType, setVisitorType] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [liveUpdates, setLiveUpdates] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const sites: KioskSite[] = [
    {
      id: "main-office",
      tenantId: "tenant1",
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
        { id: "visitor", name: "Visitor" },
        { id: "contractor", name: "Contractor" },
        { id: "interview", name: "Interview" }
      ],
      formFields: [],
      visitorCount: 12
    },
    {
      id: "warehouse",
      tenantId: "tenant1",
      name: "Warehouse",
      url: "warehouse",
      urlType: "path",
      published: true,
      branding: {
        logo: "https://placehold.co/200x100?text=Warehouse",
        primaryColor: "#10b981",
        secondaryColor: "#059669",
        favicon: "https://placehold.co/32x32?text=WH"
      },
      welcomeMessage: "Welcome to our warehouse facility.",
      language: "en",
      lastPublished: "2023-04-15T10:30:00Z",
      visitorTypes: [
        { id: "delivery", name: "Delivery" },
        { id: "visitor", name: "Visitor" }
      ],
      formFields: [],
      visitorCount: 8
    }
  ];

  const visitors: SiteVisitor[] = [
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
      siteId: "warehouse",
      name: "Sarah Wilson",
      host: "David Taylor",
      visitorType: "visitor",
      company: "123 Consulting",
      checkInTime: "08:15 AM",
      checkOutTime: "11:30 AM",
      formResponses: {},
      status: "checked-out"
    },
    {
      id: "v5",
      siteId: "main-office",
      name: "Robert Garcia",
      host: "Emma Lee",
      visitorType: "interview",
      checkInTime: "13:45 PM",
      formResponses: {},
      status: "active"
    }
  ];

  // Filter visitors based on search query, selected sites, and visitor type
  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      searchQuery === "" || 
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      visitor.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (visitor.company && visitor.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSites = selectedSites.length === 0 || selectedSites.includes(visitor.siteId);
    
    const matchesType = visitorType === "" || visitor.visitorType === visitorType;
    
    return matchesSearch && matchesSites && matchesType;
  });

  // Get site name for a given siteId
  const getSiteName = (siteId: string): string => {
    const site = sites.find(site => site.id === siteId);
    return site ? site.name : siteId;
  };

  // Get visitor types across all sites
  const allVisitorTypes = Array.from(
    new Set(sites.flatMap(site => site.visitorTypes.map(type => type.id)))
  );

  // Handle export function
  const handleExport = () => {
    console.log("Exporting filtered visitors");
    // In a real app, this would generate a CSV/PDF
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{visitors.length}</div>
            <div className="text-sm text-gray-500">Total Visitors Today</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{visitors.filter(v => v.status === "active").length}</div>
            <div className="text-sm text-gray-500">Currently Active</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{sites.length}</div>
            <div className="text-sm text-gray-500">Active Sites</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(visitors.filter(v => v.status === "active").length / sites.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Visitors per Site</div>
          </CardContent>
        </Card>
      </div>

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

      <div className="bg-white rounded-md shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Site</TableHead>
              <TableHead>Visitor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Check-In Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.map(visitor => (
              <TableRow key={visitor.id}>
                <TableCell>
                  <div className="font-medium">{getSiteName(visitor.siteId)}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <div>{visitor.name}</div>
                      {visitor.company && (
                        <div className="text-xs text-gray-500">{visitor.company}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {visitor.visitorType}
                  </Badge>
                </TableCell>
                <TableCell>{visitor.host}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {visitor.checkInTime}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      visitor.status === "active" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {visitor.status === "active" ? "Checked In" : "Checked Out"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredVisitors.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No visitors found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
