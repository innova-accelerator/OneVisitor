// TODO: Integration Points
// - Replace mock data with real API data
// - Add sorting and filtering capabilities
// - Implement pagination
// - Add real-time updates

import { Spinner } from "@/components/ui/spinner";
import { ErrorBanner } from "@/components/ui/error-banner";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

interface GlobalVisitorsTableProps {
  filteredVisitors: any[];
  getSiteName: (siteId: string) => string;
  isLoading?: boolean;
  error?: Error | null;
}

export const GlobalVisitorsTable = ({ 
  filteredVisitors, 
  getSiteName,
  isLoading = false,
  error = null
}: GlobalVisitorsTableProps) => {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner message={error.message} />;
  
  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Visitor</TableHead>
            <TableHead>Site</TableHead>
            <TableHead>Host</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVisitors.map(visitor => (
            <TableRow key={visitor.id}>
              <TableCell>
                <div className="flex items-center font-medium">
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${visitor.name}.png`} alt={visitor.name} />
                    <AvatarFallback>{visitor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {visitor.name}
                  {visitor.company && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({visitor.company})
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{getSiteName(visitor.siteId)}</TableCell>
              <TableCell>{visitor.host}</TableCell>
              <TableCell>
                <Badge variant="secondary">{visitor.visitorType}</Badge>
              </TableCell>
              <TableCell>
                {visitor.status === "active" ? (
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                ) : (
                  <Badge variant="outline">Inactive</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
          {filteredVisitors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No visitors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
