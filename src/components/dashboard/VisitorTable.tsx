
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
import { User, Clock, DoorOpen } from "lucide-react";

export const VisitorTable = () => {
  // Mock data - in a real app, this would come from an API
  const visitors = [
    {
      id: "v1",
      name: "John Doe",
      host: "Alice Smith",
      checkInTime: "09:30 AM",
      status: "active"
    },
    {
      id: "v2",
      name: "Jane Smith",
      host: "Bob Johnson",
      checkInTime: "10:15 AM",
      status: "active"
    },
    {
      id: "v3",
      name: "Michael Brown",
      host: "Carol Williams",
      checkInTime: "11:45 AM",
      status: "active"
    }
  ];

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
          {visitors.map(visitor => (
            <TableRow key={visitor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  {visitor.name}
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
                  <Button size="sm" variant="outline" className="h-8">
                    <DoorOpen className="h-4 w-4" />
                    <span className="ml-1">Unlock</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
