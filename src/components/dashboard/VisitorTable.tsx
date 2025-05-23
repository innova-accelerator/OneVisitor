
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock } from "lucide-react";
import { useState } from "react";
import { SiteVisitor } from "@/models/kiosk";

interface VisitorTableProps {
  siteId?: string;
  visitors?: SiteVisitor[];
}

export const VisitorTable = ({ siteId, visitors: propVisitors }: VisitorTableProps) => {
  // Mock data - in a real app, this would come from an API
  const defaultVisitors: SiteVisitor[] = [
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
    }
  ];

  const [visitors] = useState<SiteVisitor[]>(propVisitors || defaultVisitors);
  
  // Filter visitors by site if siteId is provided
  const filteredVisitors = siteId 
    ? visitors.filter(visitor => visitor.siteId === siteId)
    : visitors;

  return (
    <div className="bg-white rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Visitor</TableHead>
            <TableHead>Host</TableHead>
            <TableHead>Check-In Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVisitors.map(visitor => (
            <TableRow key={visitor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  {visitor.name}
                  {visitor.company && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({visitor.company})
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{visitor.host}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  {visitor.checkInTime}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  {visitor.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="h-8">
                    Check-Out
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {filteredVisitors.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No visitors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
