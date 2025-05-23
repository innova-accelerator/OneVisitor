
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, Clock } from "lucide-react";
import { SiteVisitor } from "@/models/kiosk";

interface GlobalVisitorsTableProps {
  filteredVisitors: SiteVisitor[];
  getSiteName: (siteId: string) => string;
}

export const GlobalVisitorsTable = ({ 
  filteredVisitors,
  getSiteName
}: GlobalVisitorsTableProps) => {
  return (
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
  );
};
