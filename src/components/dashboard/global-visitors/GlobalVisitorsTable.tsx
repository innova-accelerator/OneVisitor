import React from 'react';
import { 
  Badge 
} from "@/components/ui/badge";
import { User, Clock } from "lucide-react";
import { SiteVisitor } from "@/models/kiosk";
import { DataTable } from "@/components/ui/data-table";

interface GlobalVisitorsTableProps {
  filteredVisitors: SiteVisitor[];
  getSiteName: (siteId: string) => string;
}

export const GlobalVisitorsTable = ({ 
  filteredVisitors,
  getSiteName
}: GlobalVisitorsTableProps) => {
  console.info(filteredVisitors)
  
  // Helper function to determine if visitor is active based on check-in time
  const isVisitorActive = (checkIn: string, visitor: SiteVisitor) => {
    if (!checkIn || checkIn === 'Not checked in') return false;
    
    try {
      // Parse the check-in string which should be in format like "06/01/2025 02:27 AM WIB"
      let checkInDate: Date;
      
      if (checkIn.includes('WIB') || checkIn.includes('WITA') || checkIn.includes('WIT') || checkIn.includes('UTC')) {
        // Extract the datetime part without timezone
        const dateTimeStr = checkIn.replace(/\s+(WIB|WITA|WIT|UTC[+-]\d{2}:\d{2}|UTC)$/i, '').trim();
        checkInDate = new Date(dateTimeStr);
        
        // Apply timezone offset if available in visitor data
        if (visitor.timezoneOffset) {
          // timezoneOffset is in minutes, convert to milliseconds
          const offsetMs = visitor.timezoneOffset * 60 * 1000;
          checkInDate = new Date(checkInDate.getTime() + offsetMs);
        }
      } else {
        // Try to parse as regular date
        checkInDate = new Date(checkIn);
      }
      
      // Get current time in the visitor's timezone
      const now = new Date();
      let localNow = now;
      
      if (visitor.timezoneOffset) {
        // Convert current time to visitor's timezone
        const offsetMs = visitor.timezoneOffset * 60 * 1000;
        localNow = new Date(now.getTime() + offsetMs);
      }
      
      const oneHourAgo = new Date(localNow.getTime() - (60 * 60 * 1000)); // 1 hour ago in visitor's timezone
      
      return checkInDate >= oneHourAgo;
    } catch (error) {
      // Fallback: try to parse time format like "2:30 PM WIB"
      try {
        const today = new Date();
        
        // Extract time part and timezone
        const timeMatch = checkIn.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!timeMatch) return false;
        
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const isPM = timeMatch[3].toLowerCase() === 'pm';
        
        const checkInDate = new Date(today);
        checkInDate.setHours(isPM && hours !== 12 ? hours + 12 : (hours === 12 && !isPM ? 0 : hours));
        checkInDate.setMinutes(minutes);
        checkInDate.setSeconds(0);
        
        // Apply timezone offset if available
        if (visitor.timezoneOffset) {
          const offsetMs = visitor.timezoneOffset * 60 * 1000;
          checkInDate.setTime(checkInDate.getTime() + offsetMs);
        }
        
        // Get current time in visitor's timezone
        const now = new Date();
        let localNow = now;
        
        if (visitor.timezoneOffset) {
          const offsetMs = visitor.timezoneOffset * 60 * 1000;
          localNow = new Date(now.getTime() + offsetMs);
        }
        
        const oneHourAgo = new Date(localNow.getTime() - (60 * 60 * 1000));
        
        return checkInDate >= oneHourAgo;
      } catch (parseError) {
        return false;
      }
    }
  };

  // Define columns for the DataTable
  const columns = [
    {
      accessorKey: "site_name",
      header: "Site",
      cell: ({ row }: { row: { original: SiteVisitor } }) => {
        return <div className="font-medium">{row.original.site_name}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Visitor",
      cell: ({ row }: { row: { original: SiteVisitor } }) => {
        const visitor = row.original;
        return (
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
        );
      },
    },
    {
      accessorKey: "visitorType",
      header: "Type",
      cell: ({ row }: { row: { original: SiteVisitor } }) => {
        return (
          <Badge variant="outline">
            {row.original.visitorType}
          </Badge>
        );
      },
    },
    {
      accessorKey: "host_name",
      header: "Host",
    },
    {
      accessorKey: "checkIn",
      header: "Check-In Time",
      cell: ({ row }: { row: { original: SiteVisitor } }) => {
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            {row.original.checkIn}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: SiteVisitor } }) => {
        const visitor = row.original;
        const isActive = isVisitorActive(visitor.checkIn, visitor);
        
        return (
          <Badge 
            variant="outline" 
            className={
              isActive 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm">
      <DataTable 
        columns={columns}
        data={filteredVisitors}
        noDataMessage="No visitors found matching your filters."
      />
    </div>
  );
};